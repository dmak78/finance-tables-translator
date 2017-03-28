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

const parseDataIntoArray = (data) => {
  let output = []
  forEach(data, (value, key) => {
    output.push(value)
  })
  return output
}

const createRow = (row, parent, dataArray, config) => {
  const {
    id,
    order,
    name,
    style,
    data
  }
  const parentId = _.get('name')(row)
  return {
    key: id,
    order: order,
    id: id,
    name: name,
    lexicon_name: name,
    parent: parent,
    type: style && style !== "" ? style : null,
    data: data,
    children: _.map(child => createRow(child, name, dataArray))(_.filter(item => item.type === 'row' && item.parent === parentId)(dataArray))
  }
}

const createDataTables = (dataArray) => _.map(table => {
  const parentId = _.get('name')(table)
  const data_table_rows = _.filter(item => item.type === 'row' && item.parent === parentId)(dataArray)
  const data_table_total_rows = _.filter(item => item.type === 'total_row' && item.parent === parentId)(dataArray)
  return {
    key: table.id,
    order: table.order,
    id: table.id,
    name: table.style === 'memo' ? '' : table.name,
    lexicon_name: table.name,
    type: table.style,
    rows: _.map(row => createRow(row, table.name, dataArray))(data_table_rows),
    total_rows: _.map(row => createRow(row, table.name, dataArray))(data_table_total_rows),
  }
})

const processDataTables = (data) => {
  const dataArray = parseDataIntoArray(data)
  return _.flow(
    _.filter(datum => datum.type === 'data_table'),
    createDataTables(dataArray)
  )(dataArray)
}

function writeTableJson(output) {
  fs.writeJson(`output/test.json`, output, (err) => {
    if (err) console.error(err)
    console.log('done: ' + 'spending--by-mission')
  })
}

function csvToJson(config) {
  const id = `${config.section}--${config.sector}--${config.government_type}`
  const tableData = []
  return new Promise(function(resolve){
    csv({
      checkType: true
    })
      .fromFile(`input/${config.section}/${config.sector}/${config.government_type}/${id}.csv`)
      .on('json',(jsonRow) => {
        tableData.push({
          ...jsonRow,
          id: entityNameToKey(jsonRow.name)
        })
      })
      .on('done',(error) => {
        if (error) return console.error(error)
        console.log('converted: ' + id )
        resolve(tableData)
      })
  })
}

function buildTableJson(data) {
  const output = {
    "id": 'spending--by-mission',
    "lexicon_name": 'Spending By Mission',
    "name": 'Spending By Mission',
    "current_government_type": 'combined',
    "current_year": '2014',
    "available_adjustments": null,
    "rounding_unit": 1000000000,
    "precision": 1,
    "available_government_types": [
      {
        "name": 'Federal',
        "id": 'federal'
      },
      {
        "name": 'State & Local',
        "id": 'state_local'
      },
      {
        "name": 'Combined',
        "id": 'combined'
      }
    ],
    data_tables: null
  }

  output.data_tables = processDataTables(data)

  return writeTableJson(output)
}

const rowConfigValues = ['id', 'order', 'style', 'type', 'footnote', 'parent', 'name', 'source']


const isRowDataType = (row) => row.type === 'row' || row.type === 'total_row'

const processDataPoints = _.mapValues(datum => {
  const filtered = _.omit([...rowConfigValues, 'government_type'])(datum)
  return map(filtered, (value, key) => {
    return {
      x: key,
      y: value * 1000
    }
  })
})

const combineGovernmentTypeData = _.flow(
  _.keyBy(row => row.government_type),
  processDataPoints
)

const getData = (values) => {
  return isRowDataType(values[0]) ? 
    combineGovernmentTypeData(values) 
  : null
}

const combineRowJson = (values) => {
  return { 
    ..._.flow(
      _.getOr(null, '0'),
      _.pick(rowConfigValues),
    )(values),
    data: getData(values)
  }
}

const combineTableFiles = _.flow(
  _.flatten,
  _.groupBy(row => row.id),
  _.mapValues(combineRowJson),
  buildTableJson
)

const tablesToProcess = [
  'spending--by-mission--combined',
  'spending--by-mission--federal',
  'spending--by-mission--state_local'
]

const getConfigAndProcess = (config) => (id) => csvToJson(config[id])

const fetchTableCsvFiles = (config) => _.map(getConfigAndProcess(config))

const combine = (config, tableIds) => {
  const files = fetchTableCsvFiles(config)(tableIds)
  Promise.all(files).then(
    combineTableFiles
  )
}

combine(currentConfig, tablesToProcess)
