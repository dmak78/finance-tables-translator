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

import comparisonConfig from './config_comparison'

const tableConfig = comparisonConfig['spending--by-mission']

const parseDataIntoArray = (data) => {
  let output = []
  forEach(data, (value, key) => {
    output.push(value)
  })
  return output
}

const createRow = (row, parent, dataArray, config) => {
  const parentId = _.get('name')(row)
  const dataTableId = _.get('data_table')(row)
  return {
    key: row.id,
    order: row.order,
    id: row.id,
    name: row.name,
    lexicon_name: row.name,
    parent: parent,
    type: row.style && row.style !== "" ? row.style : null,
    footnote: row.footnote || null,
    data: row.data,
    children: _.map(
      child => createRow(child, row.name, dataArray)
    )(_.filter(item => item.type === 'row' && item.parent === parentId && item.data_table === dataTableId)(dataArray))
  }
}

const createDataTables = (dataArray) => _.map(table => {
  const parentId = _.get('name')(table)
  const data_table_rows = _.filter(item => item.type === 'row' && item.parent === parentId)(dataArray)
  let data_table_total_rows = _.filter(item => item.type === 'total_row' && item.parent === parentId)(dataArray)
  data_table_total_rows = _.orderBy(['order'], ['asc'])(data_table_total_rows)
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
  fs.writeJson(`output/test/041317/${tableConfig.id}.json`, output, (err) => {
    if (err) console.error(err)
    console.log('done: ' + tableConfig.id)
  })
}

function csvToJson(file) {
  const tableData = []
  const allYears = []
  return new Promise(function(resolve){
    csv({
      checkType: true
    })
      .fromFile(`input/csv/${file}.csv`)
      .on('json',(jsonRow) => {
        let rowId = jsonRow.type === 'row' || jsonRow.type === 'total_row' ? `${jsonRow.data_table}--${jsonRow.name}` : jsonRow.name
        rowId = entityNameToKey(rowId)
        // const sourceId = rowId !== '' ? `${rowId}--${jsonRow.government_type}` : ''
        // const yearDataRange = _.range(1980, 2017)
        // const yearData = _.pick(yearDataRange)(jsonRow)
        // const outputData = _.flow(
        //   _.omit(yearDataRange),
        //   (_) => ({..._, id: rowId, sourceId }),
        //   (_) => {
        //     return jsonRow.government_type ? {..._, dataset: {[jsonRow.government_type]: yearData }} : _
        //   }
        // )(jsonRow)
        // tableData.push(outputData)
        tableData.push({
          ...jsonRow,
          id: rowId
        })
      })
      .on('done',(error) => {
        if (error) return console.error(error)
        console.log('converted: ' + file )
        resolve(tableData)   
      })
  })
}

const getFootnotesFromData = _.flow(
  _.filter(row => row.type === 'footnote'),
  _.map(footnote => ({ id: footnote.footnote, text: footnote.name}))
)

function buildTableJson(data) {
  const defaults = tableConfig.defaults
  return writeTableJson({ 
    ...defaults,
    footnotes: getFootnotesFromData(data),
    data_tables: processDataTables(data)
  })
}

const rowConfigValues = ['id', 'order', 'style', 'type', 'footnote', 'parent', 'name', 'source', 'data_table']

const isRowDataType = (row) => row.type === 'row' || row.type === 'total_row'

const processDataPoints = _.mapValues(datum => {
  const filtered = _.omit([...rowConfigValues, 'government_type'])(datum)
  return map(filtered, (value, key) => {
    return {
      x: key,
      y: value * (tableConfig.multiplier || 1)
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

const tablesToProcess = tableConfig.files

const combine = (tableIds) => {
  const files = _.map(csvToJson)(tableIds)
  Promise.all(files).then(
    combineTableFiles
  )
}

combine(tablesToProcess)
