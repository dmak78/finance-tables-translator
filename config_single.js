const config = {
  'grb--all--combined': {
    id: 'grb--all--combined',
    section: 'grb',
    sector: 'all',
    government_type: 'combined',
    government_type_name: 'All',
    name: 'Net Spending By Business',
    latest_year: '2014',
    itemParentId: 'orderId',
    multiplier: 1000,
    defaults: {
      rounding_unit: 1000000000,
      precision: 2,
      current_comparison: 'by_years',
      available_comparisons: [
        {
          name: "Fiscal Year",
          id: "by_years"
        }
      ],
      available_years: [
        {
          "name": "1980",
          "id": "1980"
        },
        {
          "name": "1990",
          "id": "1990"
        },
        {
          "name": "2000",
          "id": "2000"
        },
        {
          "name": "2010",
          "id": "2010"
        },
        {
          "name": "2011",
          "id": "2011"
        },
        {
          "name": "2012",
          "id": "2012"
        },
        {
          "name": "2013",
          "id": "2013"
        },
        {
          "name": "2014",
          "id": "2014"
        },
        {
          "name": "2015",
          "id": "2015"
        }
      ]
    }
  },
  'trust-funds--pensions-balance-sheet--combined': {
    id: 'trust-funds--pensions-balance-sheet--combined',
    section: 'trust-funds',
    sector: 'pensions-balance-sheet',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Pensions Balance Sheet',
    latest_year: '2016',
    itemParentId: 'name',
    multiplier: 1000000,
    defaults: {
      rounding_unit: 1000000000,
      precision: 1,
      current_comparison: "by_years",
      available_comparisons: [
        {
          name: "Fiscal Year",
          id: "by_years"
        }
      ],
      available_years: [
        {
          "name": "1980",
          "id": "1980"
        },
        {
          "name": "1990",
          "id": "1990"
        },
        {
          "name": "2000",
          "id": "2000"
        },
        {
          "name": "2010",
          "id": "2010"
        },
        {
          "name": "2011",
          "id": "2011"
        },
        {
          "name": "2012",
          "id": "2012"
        },
        {
          "name": "2013",
          "id": "2013"
        },
        {
          "name": "2014",
          "id": "2014"
        },
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
  'spending--by-function--combined': {
    id: 'spending--by-function--combined',
    section: 'spending',
    sector: 'by-function',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Spending By Function',
    latest_year: '2014',
    itemParentId: 'name',
    multiplier: 1000000,
    defaults: {
      rounding_unit: 1000000000,
      precision: 1
    }
  },
  'spending--by-mission--combined': {
    id: 'spending--by-mission--combined',
    section: 'spending',
    sector: 'by-mission',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Spending By Mission',
    latest_year: '2014',
    itemParentId: 'name',
    multiplier: 1000,
    defaults: {
      rounding_unit: 1000000000,
      precision: 1,
      current_comparison: "by_years"
    }
  },
  'spending--by-mission--federal': {
    id: 'spending--by-mission--federal',
    section: 'spending',
    sector: 'by-mission',
    government_type: 'federal',
    government_type_name: 'Federal',
    name: 'Spending By Mission - Federal',
    latest_year: '2015',
    itemParentId: 'name',
    multiplier: 1000,
    defaults: {
      rounding_unit: 1000000000,
      precision: 1,
      current_comparison: "by_years"
    }
  },
  'spending--by-mission--state_local': {
    id: 'spending--by-mission--state_local',
    section: 'spending',
    sector: 'by-mission',
    government_type: 'state_local',
    government_type_name: 'State & Local',
    name: 'Spending By Mission - State & Local',
    latest_year: '2014',
    itemParentId: 'name',
    multiplier: 1000,
    defaults: {
      rounding_unit: 1000000000,
      precision: 1,
      current_comparison: "by_years"
    }
  },
  'revenue--government--state_local': {
    id: 'revenue--government--state_local',
    section: 'revenue',
    sector: 'government',
    government_type: 'state_local',
    government_type_name: 'State & Local',
    name: 'Government Revenue',
    latest_year: '2014',
    itemParentId: 'name',
    multiplier: 1000,
    defaults: {
      rounding_unit: 1000000000,
      precision: 1,
      current_comparison: "by_years"
    }
  },
  'revenue--government--federal': {
    id: 'revenue--government--federal',
    section: 'revenue',
    sector: 'government',
    government_type: 'federal',
    government_type_name: 'Federal',
    name: 'Government Revenue',
    latest_year: '2015',
    itemParentId: 'name',
    multiplier: 1000,
    defaults: {
      rounding_unit: 1000000000,
      precision: 1,
      current_comparison: "by_years"
    }
  },
  'revenue--government--combined': {
    id: 'revenue--government--combined',
    section: 'revenue',
    sector: 'government',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Government Revenue',
    latest_year: '2014',
    itemParentId: 'name',
    multiplier: 1000,
    defaults: {
      rounding_unit: 1000000000,
      precision: 1,
      current_comparison: "by_years"
    }
  },
  'employment--compensation-aggregate--combined': {
    id: 'employment--compensation-aggregate--combined',
    section: 'employment',
    sector: 'compensation-aggregate',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Compensation of Government Employees (aggregate)',
    latest_year: '2015',
    itemParentId: 'orderId',
    multiplier: 1000000,
    defaults: {
      rounding_unit: 1000000000,
      precision: 2,
      current_comparison: "by_years",
      available_comparisons: [
        {
          id: "by_years",
          name: "Fiscal Year"
        }
      ],
      available_years: [
        {
          "name": "1980",
          "id": "1980"
        },
        {
          "name": "1990",
          "id": "1990"
        },
        {
          "name": "2000",
          "id": "2000"
        },
        {
          "name": "2010",
          "id": "2010"
        },
        {
          "name": "2011",
          "id": "2011"
        },
        {
          "name": "2012",
          "id": "2012"
        },
        {
          "name": "2013",
          "id": "2013"
        },
        {
          "name": "2014",
          "id": "2014"
        },
        {
          "name": "2015",
          "id": "2015"
        }
      ]
    }
  },
  'employment--compensation-per-person--combined': {
    id: 'employment--compensation-per-person--combined',
    section: 'employment',
    sector: 'compensation-per-person',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Compensation of Government Employees (per person)',
    latest_year: '2015',
    itemParentId: 'orderId',
    defaults: {
      current_comparison: "by_years",
      available_comparisons: [
        {
          id: "by_years",
          name: "Fiscal Year"
        }
      ],
      available_years: [
        {
          "name": "1980",
          "id": "1980"
        },
        {
          "name": "1990",
          "id": "1990"
        },
        {
          "name": "2000",
          "id": "2000"
        },
        {
          "name": "2010",
          "id": "2010"
        },
        {
          "name": "2011",
          "id": "2011"
        },
        {
          "name": "2012",
          "id": "2012"
        },
        {
          "name": "2013",
          "id": "2013"
        },
        {
          "name": "2014",
          "id": "2014"
        },
        {
          "name": "2015",
          "id": "2015"
        }
      ]
    }
  },
  'employment--number-of-employees--combined': {
    id: 'employment--number-of-employees--combined',
    section: 'employment',
    sector: 'number-of-employees',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Total Employees',
    latest_year: '2014',
    itemParentId: 'name'
  },
  'employment--number-of-employees--federal': {
    id: 'employment--number-of-employees--federal',
    section: 'employment',
    sector: 'number-of-employees',
    government_type: 'federal',
    government_type_name: 'Federal',
    name: 'Total Employees',
    latest_year: '2014',
    itemParentId: 'name'
  },
  'employment--number-of-employees--state_local': {
    id: 'employment--number-of-employees--state_local',
    section: 'employment',
    sector: 'number-of-employees',
    government_type: 'state_local',
    government_type_name: 'State & Local',
    name: 'Total Employees',
    latest_year: '2014',
    itemParentId: 'name'
  },
  'balance-sheets--federal-reserve--federal': {
    id: 'balance-sheets--federal-reserve--federal',
    section: 'balance-sheets',
    sector: 'federal-reserve',
    government_type: 'federal',
    government_type_name: 'Federal',
    name: 'Federal Reserve Balance Sheet',
    latest_year: '2015',
    itemParentId: 'name',
    multiplier: 1000000,
    defaults: {
      rounding_unit: 1000000000,
      precision: 2,
      current_comparison: 'by_years',
      available_years: [
        {
          id: "1980",
          name: "1980"
        },
        {
          id: "1990",
          name: "1990"
        },
        {
          id: "2000",
          name: "2000"
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
  },
  'balance-sheets--government--combined': {
    id: 'balance-sheets--government--combined',
    section: 'balance-sheets',
    sector: 'government',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Government Balance Sheet - Combined',
    latest_year: '2016',
    itemParentId: 'name'
  },
  'balance-sheets--government--federal': {
    id: 'balance-sheets--government--federal',
    section: 'balance-sheets',
    sector: 'government',
    government_type: 'federal',
    government_type_name: 'Federal',
    name: 'Government Balance Sheet - Federal',
    latest_year: '2016',
    itemParentId: 'name'
  },
  'balance-sheets--government--state_local': {
    id: 'balance-sheets--government--state_local',
    section: 'balance-sheets',
    sector: 'government',
    government_type: 'state_local',
    government_type_name: 'State & Local',
    name: 'Government Balance Sheet - State & Local',
    latest_year: '2016',
    itemParentId: 'name'
  },
  'balance-sheets--gse--federal': {
    id: 'balance-sheets--gse--federal',
    section: 'balance-sheets',
    sector: 'gse',
    government_type: 'federal',
    government_type_name: 'Federal',
    name: 'Government-Sponsored Enterprises Balance Sheet',
    latest_year: '2015',
    itemParentId: 'name',
    multiplier: 1000000,
    defaults: {
      rounding_unit: 1000000000,
      precision: 2,
      current_comparison: 'by_years',
      available_years: [
        {
          id: "1980",
          name: "1980"
        },
        {
          id: "1990",
          name: "1990"
        },
        {
          id: "2000",
          name: "2000"
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
  },
  'trust-funds--all--federal': {
    id: 'trust-funds--all--federal',
    section: 'trust-funds',
    sector: 'all',
    government_type: 'federal',
    government_type_name: 'Federal',
    name: 'Trust Funds Finacials',
    latest_year: '2015',
    itemParentId: 'orderId',
    multiplier: 1000000,
    defaults: {
      rounding_unit: 1000000,
      precision: 0,
      current_comparison: 'by_years',
      available_years: [
        {
          id: "1980",
          name: "1980"
        },
        {
          id: "1990",
          name: "1990"
        },
        {
          id: "2000",
          name: "2000"
        },
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
  },
  'employment--compensation-per-person-per-hour--state_local': {
    id: 'employment--compensation-per-person-per-hour--state_local',
    section: 'employment',
    sector: 'compensation-per-person-per-hour',
    government_type: 'state_local',
    government_type_name: 'State & Local',
    name: 'Wages of State & Local Employees (per person per hour)',
    latest_year: '2015',
    itemParentId: 'orderId',
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

export default config