const config = {
  'spending--by-mission--combined': {
    id: 'spending--by-mission--combined',
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
    id: 'spending--by-mission--federal',
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
  'spending--by-mission--state_local': {
    id: 'spending--by-mission--state_local',
    section: 'spending',
    sector: 'by-mission',
    government_type: 'state_local',
    government_type_name: 'State & Local',
    name: 'Spending By Mission - State & Local',
    latest_year: '2014',
    itemParentId: 'name',
    defaults: {
      rounding_unit: 1000000000,
      precision: 1
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
    defaults: {
      rounding_unit: 1000000000,
      precision: 1
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
    itemParentId: 'name'
  },
  'revenue--government--combined': {
    id: 'revenue--government--combined',
    section: 'revenue',
    sector: 'government',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Government Revenue',
    latest_year: '2015',
    itemParentId: 'name'
  },
  'employment--compensation-aggregate--combined': {
    id: 'employment--compensation-aggregate--combined',
    section: 'employment',
    sector: 'compensation-aggregate',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Compensation of Government Employees (aggregate)',
    latest_year: '2014',
    itemParentId: 'orderId',
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
    id: 'employment--compensation-per-person--combined',
    section: 'employment',
    sector: 'compensation-per-person',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Compensation of Government Employees (per person)',
    latest_year: '2014',
    itemParentId: 'orderId',
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
  'balance-sheets--federal-reserve--combined': {
    id: 'balance-sheets--federal-reserve--combined',
    section: 'balance-sheets',
    sector: 'federal-reserve',
    government_type: 'combined',
    government_type_name: 'Combined',
    name: 'Federal Reserve Balance Sheet',
    latest_year: '2015',
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
    itemParentId: 'name'
  },
  'employment--compensation-per-person-per-hour--state_local': {
    id: 'employment--compensation-per-person-per-hour--state_local',
    section: 'employment',
    sector: 'compensation-per-person-per-hour',
    government_type: 'state_local',
    government_type_name: 'State & Local',
    name: 'Compensation Per Person Per Hour (State & Local)',
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