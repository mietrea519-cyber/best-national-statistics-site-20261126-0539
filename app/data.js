// Indonesia in Numbers — the dataset behind the site.
// Every figure carries its source and year. Figures were checked against
// the World Bank's World Development Indicators and BPS (Statistics
// Indonesia) releases, November 2026. Nothing here is fetched at run time:
// the site works fully offline from these files alone.

export const COUNTRY = {
  name: 'Indonesia',
  tagline: 'The archipelago in numbers',
  capital: 'Nusantara (Jakarta until 2024)',
  areaKm2: 1904569,
  islands: 17508,
  provinces: 38,
  currency: 'Indonesian rupiah (IDR)',
  updated: 'November 2026',
};

// Headline indicators shown on the overview page.
export const HEADLINES = [
  {
    id: 'population',
    label: 'Population',
    value: '283.5M',
    note: '4th largest in the world',
    source: 'World Bank, 2024',
  },
  {
    id: 'gdp',
    label: 'GDP',
    value: '$1.40T',
    note: '16th largest economy',
    source: 'World Bank, 2024',
  },
  {
    id: 'gdpPerCapita',
    label: 'GDP per capita',
    value: '$4,925',
    note: 'Upper-middle income',
    source: 'World Bank, 2024',
  },
  {
    id: 'growth',
    label: 'GDP growth',
    value: '5.03%',
    note: 'Real growth, 2024',
    source: 'World Bank / BPS, 2024',
  },
];

// Gross domestic product, current US dollars, World Bank WDI.
export const GDP_SERIES = [
  { year: 2015, gdp: 860.9, growth: 4.9 },
  { year: 2016, gdp: 931.9, growth: 5.0 },
  { year: 2017, gdp: 1015.6, growth: 5.1 },
  { year: 2018, gdp: 1042.3, growth: 5.2 },
  { year: 2019, gdp: 1119.1, growth: 5.0 },
  { year: 2020, gdp: 1059.1, growth: -2.1 },
  { year: 2021, gdp: 1186.5, growth: 3.7 },
  { year: 2022, gdp: 1319.1, growth: 5.3 },
  { year: 2023, gdp: 1371.2, growth: 5.0 },
  { year: 2024, gdp: 1396.3, growth: 5.0 },
];

// Economy page: the wider picture, all World Bank 2024 unless noted.
export const ECONOMY = [
  { label: 'GDP (PPP)', value: '$4.66T', source: 'World Bank, 2024' },
  { label: 'Exports of goods & services', value: '22.2% of GDP', source: 'World Bank, 2024' },
  { label: 'Imports of goods & services', value: '20.4% of GDP', source: 'World Bank, 2024' },
  { label: 'Foreign direct investment', value: '$24.2B', source: 'World Bank, 2024' },
  { label: 'Inflation (consumer prices)', value: '1.57%', source: 'BPS, 2024' },
  { label: 'Exchange rate', value: 'Rp 15,855 / US$', source: 'World Bank, 2024' },
  { label: 'Unemployment (open rate)', value: '4.91%', source: 'BPS, Aug 2024' },
  { label: 'Poverty rate', value: '8.57%', source: 'BPS, Sep 2024' },
];

// People page: age structure and wellbeing, World Bank unless noted.
export const PEOPLE = [
  { label: 'Aged 0–14', value: '24.6%', source: 'World Bank, 2024' },
  { label: 'Aged 15–64', value: '68.1%', source: 'World Bank, 2024' },
  { label: 'Aged 65+', value: '7.3%', source: 'World Bank, 2024' },
  { label: 'Urban population', value: '58.8%', source: 'World Bank, 2024' },
  { label: 'Life expectancy', value: '71.3 years', source: 'World Bank, 2023' },
  { label: 'Population density', value: '149 / km²', source: 'World Bank, 2023' },
  { label: 'Fertility rate', value: '2.1 births / woman', source: 'World Bank, 2023' },
  { label: 'Internet users', value: '72.8%', source: 'World Bank, 2024' },
];

// Poverty rate, September of each year, BPS. The 2024 reading is the
// lowest since BPS began publishing poverty data in 1960.
export const POVERTY_SERIES = [
  { year: 2018, rate: 9.66 },
  { year: 2019, rate: 9.22 },
  { year: 2020, rate: 9.78 },
  { year: 2021, rate: 9.71 },
  { year: 2022, rate: 9.57 },
  { year: 2023, rate: 9.36 },
  { year: 2024, rate: 8.57 },
];

export const POVERTY_DETAIL = {
  poorPeople: '24.06 million people',
  urban: '6.66%',
  rural: '11.34%',
  line: 'Rp 595,242 per capita per month',
  source: 'BPS, September 2024',
};

// Largest provinces by population, BPS mid-year estimates 2024 (millions).
export const PROVINCES = [
  { name: 'West Java', population: 50.35, capital: 'Bandung' },
  { name: 'East Java', population: 41.81, capital: 'Surabaya' },
  { name: 'Central Java', population: 38.36, capital: 'Semarang' },
  { name: 'North Sumatra', population: 15.59, capital: 'Medan' },
  { name: 'Banten', population: 12.43, capital: 'Serang' },
  { name: 'Jakarta', population: 10.56, capital: 'Jakarta' },
  { name: 'South Sulawesi', population: 9.36, capital: 'Makassar' },
  { name: 'Lampung', population: 9.18, capital: 'Bandar Lampung' },
  { name: 'South Sumatra', population: 8.84, capital: 'Palembang' },
  { name: 'Riau', population: 6.82, capital: 'Pekanbaru' },
];

export const SOURCES = [
  {
    name: 'World Bank — World Development Indicators',
    what: 'Population, GDP, GDP per capita, growth, trade, FDI, age structure, urban share, life expectancy, internet use.',
    note: 'Vintage November 2026; figures quoted for 2024 unless stated.',
  },
  {
    name: 'BPS — Statistics Indonesia',
    what: 'Poverty profile September 2024, open unemployment August 2024, inflation 2024, provincial population estimates.',
    note: 'Press releases No. 07/01/Th. XXVIII (January 2025) and the labour-force release, August 2024.',
  },
  {
    name: 'ASEANstats',
    what: 'Cross-checks on regional context: ASEAN population and GDP shares, 2024.',
    note: 'ASEAN Statistical Highlights 2025.',
  },
];
