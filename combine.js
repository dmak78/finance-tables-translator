const Promise = require('bluebird')
import fs from 'fs-extra'
import _ from 'lodash/fp'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import merge from 'lodash/merge'
import mergeWith from 'lodash/mergeWith'
import csv from 'csvtojson'

const currentConfig = {
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
  'balance-sheets--government--combined': {
    section: 'balance-sheets',
    sector: 'government',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Government Balance Sheet',
    latest_year: '2015',
    itemParentId: 'name'
  },
  'balance-sheets--government--federal': {
    section: 'balance-sheets',
    sector: 'government',
    government_type: 'federal',
    government_type_name: 'Federal',
    name: 'Government Balance Sheet',
    latest_year: '2015',
    itemParentId: 'name'
  },
  'balance-sheets--government--state_local': {
    section: 'balance-sheets',
    sector: 'government',
    government_type: 'state_local',
    government_type_name: 'State & Local',
    name: 'Government Balance Sheet',
    latest_year: '2015',
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

const parseDataIntoArray = (data) => {
  let output = []
  forEach(data, (value, key) => {
    output.push(value)
  })
  return output
}

const createRow = (row, parent, dataArray, config) => {
  const parentId = _.get('name')(row)
  return {
    key: row.id,
    order: row.order,
    id: row.id,
    name: row.name,
    lexicon_name: row.name,
    parent: parent,
    type: row.style && row.style !== "" ? row.style : null,
    data: row.data,
    children: _.map(row => createRow(row, row.name, dataArray))(_.filter(item => item.type === 'row' && item.parent === parentId)(dataArray))
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
  fs.writeJson(`output/revenue--government.json`, output, (err) => {
    if (err) console.error(err)
    console.log('done: ' + 'revenue--government')
  })
}

function buildTableJson(data) {
  const output = {
    "id": 'revenue--government',
    "lexicon_name": 'Government Revenue',
    "name": 'Government Revenue',
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

function entityNameToKey(name) {
  return name.toLowerCase().replace(/ /g,'_')
}

const tablesToProcess = [
  'revenue--government--combined',
  'revenue--government--federal',
  'revenue--government--state_local'
]

function csvToJson(config) {
  const id = `${config.section}--${config.sector}--${config.government_type}`
  const tableData = []
  return new Promise(function(resolve){
    csv({
      checkType: true
    })
      .fromFile(`input/${config.section}/${config.sector}/${config.government_type}/${id}.csv`)
      .on('json',(jsonRow)=>{
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

const files = _.map(id => {
  return csvToJson(currentConfig[id])
})(tablesToProcess)

Promise.all(files).then(function(data){
  const rowConfigValues = ['id', 'order', 'style', 'type', 'footnote', 'parent', 'name', 'source']
  const rawJson = _.mapValues((values) => {
    const rowObject = _.pick(rowConfigValues)(values[0])
    let data = rowObject.type === 'row' || rowObject.type === 'total_row' ? _.keyBy(row => row.government_type)(values) : null
    data = _.mapValues(datum => {
      const filtered = _.omit([...rowConfigValues, 'government_type'])(datum)
      return map(filtered, (value, key) => {
        return {
          x: key,
          y: value * 1000
        }
      })
    })(data)
    return {
      ...rowObject,
      data
    }
  })(_.groupBy(row => row.id)(_.flatten(data)))
  buildTableJson(rawJson)
  fs.writeJson(`input/test.json`, rawJson, (err) => {
    if (err) console.error(err)
  })
})