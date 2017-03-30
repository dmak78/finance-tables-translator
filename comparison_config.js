import { defaultYears, defaultGovernmentTypes } from './defaults'

const comparisonConfig = {
  'balance-sheets--government': {
    files: [
      'balance-sheets--government--combined',
      'balance-sheets--government--federal',
      'balance-sheets--government--state_local',
    ],
    multiplier: 1000000,
    defaults: {
      "id": 'balance-sheets--government',
      "name": 'Government Balance Sheet',
      "lexicon_name": 'Government Balance Sheet',
      "current_comparison": "by_government_type",
      "current_government_type": 'combined',
      "current_year": '2016',
      "available_adjustments": null,
      "rounding_unit": 1000000000,
      "precision": 1,
      "available_government_types": defaultGovernmentTypes,
      "available_years": [
        ...defaultYears, 
        {
          "name": "2015",
          "id": "2015"
        },
        {
          "name": "2016",
          "id": "2016"
        }
      ]
    }
  },
  'employment--number-of-employees': {
    files: [
      'employment--number-of-employees--combined',
      'employment--number-of-employees--federal',
      'employment--number-of-employees--state_local',
    ],
    multiplier: 1,
    defaults: {
      "id": 'employment--number-of-employees',
      "name": 'Total Government Employees',
      "lexicon_name": 'Total Government Employees',
      "current_comparison": "by_government_type",
      "current_government_type": 'combined',
      "current_year": '2014',
      "available_adjustments": null,
      "rounding_unit": 1,
      "precision": 0,
      "available_government_types": defaultGovernmentTypes,
      "available_years": defaultYears
    }
  },
  'revenue--government': {
    files: [
      'revenue--government--combined',
      'revenue--government--federal',
      'revenue--government--state_local',
    ],
    multiplier: 1000,
    defaults: {
      "id": 'revenue--government',
      "name": 'Government Revenue',
      "lexicon_name": 'Government Revenue',
      "current_comparison": "by_government_type",
      "current_government_type": 'combined',
      "current_year": '2014',
      "available_adjustments": null,
      "rounding_unit": 1000000000,
      "precision": 1,
      "available_government_types": defaultGovernmentTypes,
      "available_years": [
        ...defaultYears,
        {
          "name": "2015",
          "id": "2015"
        }
      ]
    }
  },
  'spending--by-mission': {
    files: [
      'spending--by-mission--combined',
      'spending--by-mission--federal',
      'spending--by-mission--state_local',
    ],
    multiplier: 1000,
    defaults: {
      "id": 'spending--by-mission',
      "name": 'Government Spending By Mission',
      "lexicon_name": 'Government Spending By Mission',
      "current_comparison": "by_government_type",
      "current_government_type": 'combined',
      "current_year": '2014',
      "available_adjustments": null,
      "rounding_unit": 1000000000,
      "precision": 1,
      "available_government_types": defaultGovernmentTypes,
      "available_years": [
        ...defaultYears,
        {
          "name": "2015",
          "id": "2015"
        }
      ]
    }
  },
  'spending--by-function': {
    files: [
      'spending--by-function--combined'
    ],
    multiplier: 1000000,
    defaults: {
      "id": 'spending--by-function',
      "name": 'Government Spending By Function',
      "lexicon_name": 'Government Spending By Function',
      "current_comparison": "by_government_type",
      "current_government_type": 'combined',
      "current_year": '2014',
      "available_adjustments": null,
      "rounding_unit": 1000000000,
      "precision": 1,
      "available_government_types": defaultGovernmentTypes,
      "available_years": defaultYears
    }
  },
}

export default comparisonConfig