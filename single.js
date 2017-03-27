const Promise = require('bluebird')
import fs from 'fs-extra'
import _ from 'lodash/fp'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import merge from 'lodash/merge'
import mergeWith from 'lodash/mergeWith'
import csv from 'csvtojson'

const currentConfig = {
  'spending--by-mission--combined': {
    section: 'spending',
    sector: 'by-mission',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Spending By Mission',
    latest_year: '2014',
    itemParentId: 'name',
    defaults: {
      rounding_unit: 1000000000,
      precision: 1
    }
  },
  'spending--by-mission--federal': {
    section: 'spending',
    sector: 'by-mission',
    government_type: 'federal',
    government_type_name: 'Federal',
    name: 'Spending By Mission - Federal',
    latest_year: '2015',
    itemParentId: 'name',
    defaults: {
      rounding_unit: 1000000000,
      precision: 1
    }
  },
  'revenue--government--state_local': {
    section: 'revenue',
    sector: 'government',
    government_type: 'state_local',
    government_type_name: 'State & Local',
    name: 'Government Revenue',
    latest_year: '2014',
    itemParentId: 'name',
    defaults: {
      rounding_unit: 1000000000,
      precision: 1
    }
  },
  'revenue--government--federal': {
    section: 'revenue',
    sector: 'government',
    government_type: 'federal',
    government_type_name: 'Federal',
    name: 'Government Revenue',
    latest_year: '2015',
    itemParentId: 'name'
  },
  'revenue--government--combined': {
    section: 'revenue',
    sector: 'government',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Government Revenue',
    latest_year: '2015',
    itemParentId: 'name'
  },
  'employment--compensation-aggregate--combined': {
    section: 'employment',
    sector: 'compensation-aggregate',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Compensation of Government Employees (aggregate)',
    latest_year: '2014',
    itemParentId: 'tableId',
    defaults: {
      current_comparison: "by_years",
      available_comparisons: [
        {
          id: "by_years",
          name: "Fiscal Year"
        }
      ]
    }
  },
  'employment--compensation-per-person--combined': {
    section: 'employment',
    sector: 'compensation-per-person',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Compensation of Government Employees (per person)',
    latest_year: '2014',
    itemParentId: 'tableId',
    defaults: {
      current_comparison: "by_years",
      available_comparisons: [
        {
          id: "by_years",
          name: "Fiscal Year"
        }
      ]
    }
  },
  'employment--number-of-employees--combined': {
    section: 'employment',
    sector: 'number-of-employees',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Total Employees',
    latest_year: '2014',
    itemParentId: 'name'
  },
  'employment--number-of-employees--federal': {
    section: 'employment',
    sector: 'number-of-employees',
    government_type: 'federal',
    government_type_name: 'Federal',
    name: 'Total Employees',
    latest_year: '2014',
    itemParentId: 'name'
  },
  'employment--number-of-employees--state_local': {
    section: 'employment',
    sector: 'number-of-employees',
    government_type: 'state_local',
    government_type_name: 'State & Local',
    name: 'Total Employees',
    latest_year: '2014',
    itemParentId: 'name'
  },
  'balance-sheets--federal-reserve--combined': {
    section: 'balance-sheets',
    sector: 'federal-reserve',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Federal Reserve Balance Sheet',
    latest_year: '2015',
    itemParentId: 'name'
  },
  'balance-sheets--gse--federal': {
    section: 'balance-sheets',
    sector: 'gse',
    government_type: 'federal',
    government_type_name: 'Federal',
    name: 'Government-Sponsored Enterprises Balance Sheet',
    latest_year: '2015',
    itemParentId: 'name'
  },
  'employment--compensation-per-person-per-hour--state_local': {
    section: 'employment',
    sector: 'compensation-per-person-per-hour',
    government_type: 'state_local',
    government_type_name: 'State & Local',
    name: 'Compensation Per Person Per Hour (State & Local)',
    latest_year: '2015',
    itemParentId: 'tableId',
    defaults: {
      current_comparison: "by_years",
      precision: 2,
      available_years: [
        {
          id: "2005",
          name: "2005"
        },
        {
          id: "2010",
          name: "2010"
        },
        {
          id: "2011",
          name: "2011"
        },
        {
          id: "2012",
          name: "2012"
        },
        {
          id: "2013",
          name: "2013"
        },
        {
          id: "2014",
          name: "2014"
        },
        {
          id: "2015",
          name: "2015"
        }
      ],
      available_comparisons: [
        {
          name: "Fiscal Year",
          id: "by_years"
        }
      ]
    }
  }
}

function entityNameToKey(name) {
  return name.toLowerCase().replace(/ /g,'_')
}

const parseDataIntoArray = (data, config) => {
  let output = []
  forEach(data, (value, key) => {
    output.push({
      ...value,
      tableId: _.parseInt(10)(key),
      rowId: entityNameToKey(value.name),
      parentId: config.itemParentId === 'name' ? entityNameToKey(value.parent) : value.parent
    })
  })
  return output
}

const createRow = (row, parent, dataArray, config) => {
  const parentId = _.get(config.itemParentId)(row)
  return {
    key: `${row.tableId}--${config.government_type}`,
    order: row.tableId,
    id: row.rowId,
    name: row.name,
    lexicon_name: row.name,
    parent: parent,
    type: row.style && row.style !== "" ? row.style : null,
    data: {
      [row.government_type]: map(_.pick(_.range(1980, 2016))(row), (value, key) => {
        return {
          x: key,
          y: value * 1000
        }
      })
    },
    children: _.map(row => createRow(row, row.name, dataArray, config))(_.filter(item => item.type === 'row' && item.parent === parentId)(dataArray))
  }
}

const createDataTables = (dataArray, config) => _.map(table => {
  const parentId = _.get(config.itemParentId)(table)
  const data_table_rows = _.filter(item => item.type === 'row' && item.parent === parentId)(dataArray)
  const data_table_total_rows = _.filter(item => item.type === 'total_row' && item.parent === parentId)(dataArray)
  return {
    key: table.tableId,
    order: table.tableId,
    id: table.rowId,
    name: table.style === 'memo' ? '' : table.name,
    lexicon_name: table.name,
    type: table.style,
    rows: _.map(row => createRow(row, table.name, dataArray, config))(data_table_rows),
    total_rows: _.map(row => createRow(row, table.name, dataArray, config))(data_table_total_rows),
  }
})

const processDataTables = (data, config) => {
  const dataArray = parseDataIntoArray(data, config)
  return _.flow(
    _.filter(datum => datum.type === 'data_table'),
    createDataTables(dataArray, config)
  )(dataArray)
}

function writeTableJson(output, config) {
  const id = `${config.section}--${config.sector}--${config.government_type}`
  fs.writeJson(`output/${id}.json`, output, (err) => {
    if (err) console.error(err)
    console.log('done: ' + id)
  })
}

function buildTableJson(data, config) {
  const output = {
    ...config.defaults,
    "id": `${config.section}--${config.sector}--${config.government_type}`,
    "lexicon_name": config.name,
    "name": config.name,
    "current_government_type": config.government_type,
    "current_year": config.latest_year,
    "available_adjustments": null,
    "available_government_types": [
      {
        "name": config.government_type_name,
        "id": config.government_type
      }
    ],
    data_tables: null
  }
  output.data_tables = processDataTables(data, config)

  return writeTableJson(output, config)
}

const tablesToProcess = [
  'spending--by-mission--federal'
]

function convertCSV(config) {
  const id = `${config.section}--${config.sector}--${config.government_type}`
  const tableData = {}
  csv({
    checkType: true
  })
    .fromFile(`input/${config.section}/${config.sector}/${config.government_type}/${id}.csv`)
    .on('json',(jsonRow)=>{
      tableData[jsonRow.order] = jsonRow
    })
    .on('done',(error) => {
      if (error) return console.error(error)
      console.log('converted: ' + id )
      buildTableJson(tableData, config)
    })
}

forEach(tablesToProcess, (table) => {
  convertCSV(currentConfig[table])
})
