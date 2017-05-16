const Promise = require('bluebird')
import fs from 'fs-extra'
import _ from 'lodash/fp'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import merge from 'lodash/merge'
import mergeWith from 'lodash/mergeWith'
import csv from 'csvtojson'

const fileName = 'justice.json'
const allSpendingFile = 'all_spending.json'

fs.readJson(`input/heros/${allSpendingFile}`, (err, json) => {
  if (err) console.error(err)
  console.log(json)
})