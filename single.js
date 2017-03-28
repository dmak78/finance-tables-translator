const Promise = require('bluebird')
import fs from 'fs-extra'
import _ from 'lodash/fp'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import merge from 'lodash/merge'
import mergeWith from 'lodash/mergeWith'
import csv from 'csvtojson'
import { entityNameToKey } from './lib'
import currentConfig from './config'

const parseDataIntoArray = _.map(item => (
  {
    ...item,
    orderId: _.parseInt(10)(item.order),
    nameId: entityNameToKey(item.name)
  }
))

const createRow = (row, parent, dataArray, config) => {
  const {
    orderId,
    nameId,
    name,
    style,
    government_type
  } = row
  const parentId = _.get(config.itemParentId)(row)
  const childRows = _.filter(item => item.type === 'row' && item.parent === parentId)(dataArray)
  const multiplier = config.multiplier || 1
  return {
    "key": `${orderId}--${config.government_type}`,
    "order": orderId,
    "id": `${orderId}--${nameId}`,
    "name": name,
    "lexicon_name": name,
    "parent": parent,
    "type": style && style !== "" ? style : null,
    "data": {
      [row.government_type]: map(_.pick(_.range(1980, 2016))(row), (value, key) => {
        return {
          x: key,
          y: value * multiplier
        }
      })
    },
    "children": _.map(child => createRow(child, name, dataArray, config))(childRows)
  }
}

const getDataTableRows = (dataTableId) => _.filter(item => item.type === 'row' && item.parent === dataTableId)
const getDataTableTotalRows = (dataTableId) => _.filter(item => item.type === 'total_row' && item.parent === dataTableId)
const createRows = (name, dataArray, config) => _.map(row => createRow(row, name, dataArray, config))

const createDataTables = (dataArray, config) => _.map(dataTable => {
  const {
    orderId,
    nameId,
    name,
    style
  } = dataTable
  const parentId = _.get(config.itemParentId)(dataTable)
  return {
    "key": `data-table--${nameId}`,
    "order": orderId,
    "id": nameId,
    "name": style === 'memo' ? '' : name,
    "lexicon_name": name,
    "type": style,
    "rows": createRows(name, dataArray, config)(getDataTableRows(parentId)(dataArray)),
    "total_rows": createRows(name, dataArray, config)(getDataTableTotalRows(parentId)(dataArray)),
  }
})

const processDataTables = (data, config) => {
  const dataArray = parseDataIntoArray(data)
  return _.flow(
    _.filter(datum => datum.type === 'data_table'),
    createDataTables(dataArray, config)
  )(dataArray)
}

function buildTableJson(data, config) {
  const {
    id,
    name,
    government_type,
    government_type_name,
    latest_year,
    defaults
  } = config
  return new Promise(function (resolve) {
    const output = {
      ...defaults,
      "id": id,
      "lexicon_name": name,
      "name": name,
      "current_government_type": government_type,
      "current_year": latest_year,
      "available_adjustments": null,
      "available_government_types": [
        {
          "name": government_type_name,
          "id": government_type
        }
      ],
      "data_tables": processDataTables(data, config)
    }
    resolve(output)
  })
}

function writeTableJson(id) {
  return function(output) {
    fs.writeJson(`output/${id}.json`, output, (err) => {
      if (err) console.error(err)
      console.log('done: ' + id)
    })
  }
}

function convertCSV(config) {
  const { id } = config
  const tableData = {}
  csv({
    checkType: true
  })
  .fromFile(`input/csv/${id}.csv`)
  .on('json',(jsonRow)=>{
    tableData[jsonRow.order] = jsonRow
  })
  .on('done',(error) => {
    if (error) return console.error(error)
    console.log('converted: ' + id )
    buildTableJson(tableData, config)
      .then(writeTableJson(id))
  })
}

const tablesToProcess = [
  'spending--by-mission--combined',
  'spending--by-mission--state_local',
  'spending--by-mission--federal',
  'employment--compensation-aggregate--combined',
  'grb--all--combined',
  'revenue--government--state_local',
  'revenue--government--federal',
  'revenue--government--combined'
]

forEach(tablesToProcess, (table) => {
  convertCSV(currentConfig[table])
})
