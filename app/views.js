// Views for Indonesia in Numbers.
// Hash-routed pages rendered into #view. Charts are drawn after the
// markup lands in the document, so every canvas has a real width.

import {
  COUNTRY,
  HEADLINES,
  GDP_SERIES,
  ECONOMY,
  PEOPLE,
  POVERTY_SERIES,
  POVERTY_DETAIL,
  PROVINCES,
  SOURCES,
} from './data.js';
import { drawBarChart, drawLineChart, drawHBarChart, drawDonut } from './charts.js';

const view = document.getElementById('view');

function moneyBillions(v) {
  return '$' + v.toLocaleString('en-US', { maximumFractionDigits: 1 }) + 'B';
}

function kpiCards() {
  return '<div class="kpi-grid">' + HEADLINES.map((h) => (
    '<article class="kpi">' +
      '<div class="kpi-value">' + h.value + '</div>' +
      '<div class="kpi-label">' + h.label + '</div>' +
      '<div class="kpi-note">' + h.note + '</div>' +
      '<div class="kpi-source">' + h.source + '</div>' +
    '</article>'
  )).join('') + '</div>';
}

function renderOverview() {
  view.innerHTML =
    '<p class="kicker">Country profile · ' + COUNTRY.updated + '</p>' +
    '<h1>Indonesia, the world&rsquo;s fourth most populous country, in numbers</h1>' +
    '<p class="lede">An archipelago of ' + COUNTRY.islands.toLocaleString('en-US') +
    ' islands across ' + COUNTRY.areaKm2.toLocaleString('en-US') +
    ' km², home to 283.5 million people and Southeast Asia&rsquo;s largest economy. ' +
    'Every figure on this site names its source and its year.</p>' +
    kpiCards() +
    '<section>' +
      '<h2>Gross domestic product, 2015–2024</h2>' +
      '<p class="section-note">Current US dollars, World Bank World Development Indicators.</p>' +
      '<div class="card"><canvas class="chart" id="gdp-chart" role="img" aria-label="Bar chart of Indonesia GDP from 2015 to 2024, rising from 861 to 1,396 billion dollars"></canvas>' +
      '<p class="source-note">GDP grew every year of the decade except 2020, when the pandemic shrank it by 2.1%. ' +
      'The 2024 figure of $1,396 billion puts Indonesia 16th in the world by total GDP.</p></div>' +
    '</section>' +
    '<section class="split">' +
      '<div class="card"><h3>Who lives here</h3>' +
        '<p class="card-note">Age structure, 2024 · World Bank</p>' +
        '<div class="donut-wrap">' +
          '<canvas id="age-donut" width="190" height="190" style="width:190px;height:190px" role="img" aria-label="Donut chart of age structure: 24.6 percent aged 0 to 14, 68.1 percent aged 15 to 64, 7.3 percent aged 65 and over"></canvas>' +
          '<ul class="legend">' +
            '<li><span class="swatch" style="background:#0d5c57"></span>Aged 0–14<span class="legend-value">24.6%</span></li>' +
            '<li><span class="swatch" style="background:#17837c"></span>Aged 15–64<span class="legend-value">68.1%</span></li>' +
            '<li><span class="swatch" style="background:#e8a33d"></span>Aged 65+<span class="legend-value">7.3%</span></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="card"><h3>At a glance</h3>' +
        '<ul class="fact-list">' +
          '<li><span>Capital</span><span class="fact-value">Nusantara</span></li>' +
          '<li><span>Provinces</span><span class="fact-value">38</span></li>' +
          '<li><span>Urban population</span><span class="fact-value">58.8%</span></li>' +
          '<li><span>Life expectancy</span><span class="fact-value">71.3 years</span></li>' +
          '<li><span>Currency</span><span class="fact-value">Rupiah (IDR)</span></li>' +
        '</ul>' +
        '<p class="source-note">Sources: World Bank, 2023–2024. The capital moved from Jakarta to Nusantara in 2024.</p>' +
      '</div>' +
    '</section>';

  drawBarChart(
    document.getElementById('gdp-chart'),
    GDP_SERIES.map((d, i) => ({ label: d.year, value: d.gdp, highlight: i === GDP_SERIES.length - 1 })),
    (v) => '$' + Math.round(v) + 'B',
  );
  drawDonut(document.getElementById('age-donut'), [
    { value: 24.6, color: '#0d5c57' },
    { value: 68.1, color: '#17837c' },
    { value: 7.3, color: '#e8a33d' },
  ], '283.5M');
}

function renderEconomy() {
  view.innerHTML =
    '<p class="kicker">Economy</p>' +
    '<h1>An economy of $1.40 trillion, growing about 5% a year</h1>' +
    '<p class="lede">Indonesia is the world&rsquo;s 16th largest economy and the largest in Southeast Asia. ' +
    'Growth has held near 5% a year since the pandemic rebound, and the 2024 poverty rate is the lowest BPS has ever recorded.</p>' +
    '<section>' +
      '<h2>GDP growth, 2015–2024</h2>' +
      '<p class="section-note">Annual real growth, percent · World Bank</p>' +
      '<div class="card"><canvas class="chart" id="growth-chart" role="img" aria-label="Line chart of GDP growth from 2015 to 2024, between 3.7 and 5.3 percent except a fall of 2.1 percent in 2020"></canvas>' +
      '<p class="source-note">The 2020 contraction of 2.1% was Indonesia&rsquo;s first annual decline since the 1998 Asian financial crisis.</p></div>' +
    '</section>' +
    '<section>' +
      '<h2>The wider economy</h2>' +
      '<p class="section-note">Each figure with its source and year.</p>' +
      '<div class="card"><table class="data">' +
        '<thead><tr><th>Indicator</th><th class="num">Value</th><th>Source</th></tr></thead>' +
        '<tbody>' +
        ECONOMY.map((e) => '<tr><td>' + e.label + '</td><td class="num"><strong>' + e.value + '</strong></td><td>' + e.source + '</td></tr>').join('') +
        '</tbody></table></div>' +
    '</section>' +
    '<div class="callout"><strong>Why it matters:</strong> with GDP per capita of $4,925 and growth near 5%, ' +
    'Indonesia&rsquo;s economy roughly doubles in size every fourteen years — the context behind every other number on this site.</div>';

  drawLineChart(
    document.getElementById('growth-chart'),
    GDP_SERIES.map((d) => ({ label: d.year, value: d.growth })),
    (v) => v.toFixed(1) + '%',
  );
}

function renderPeople() {
  view.innerHTML =
    '<p class="kicker">People</p>' +
    '<h1>283.5 million people, mostly young, mostly urbanising</h1>' +
    '<p class="lede">Two in three Indonesians are of working age, and 58.8% now live in towns and cities. ' +
    'Poverty has fallen in seven of the last eight Septembers measured by BPS.</p>' +
    '<section class="split">' +
      '<div class="card"><h3>Population profile</h3>' +
        '<ul class="fact-list">' +
        PEOPLE.map((p) => '<li><span>' + p.label + '</span><span class="fact-value">' + p.value + '</span></li>').join('') +
        '</ul>' +
        '<p class="source-note">Sources: World Bank, 2023–2024.</p>' +
      '</div>' +
      '<div class="card"><h3>Poverty, falling</h3>' +
        '<p class="card-note">Share of population below the national poverty line · BPS</p>' +
        '<p><strong>' + POVERTY_DETAIL.poorPeople + '</strong> were poor in September 2024 — ' +
        POVERTY_DETAIL.urban + ' in towns and cities, ' + POVERTY_DETAIL.rural + ' in rural areas.</p>' +
        '<p class="source-note">Poverty line: ' + POVERTY_DETAIL.line + '. ' + POVERTY_DETAIL.source + '.</p>' +
      '</div>' +
    '</section>' +
    '<section>' +
      '<h2>Poverty rate, September of each year</h2>' +
      '<p class="section-note">Percent of population · BPS</p>' +
      '<div class="card"><canvas class="chart" id="poverty-chart" role="img" aria-label="Line chart of the poverty rate falling from 9.66 percent in 2018 to 8.57 percent in 2024"></canvas>' +
      '<p class="source-note">8.57% in September 2024 is the lowest poverty rate since BPS began publishing the series in 1960.</p></div>' +
    '</section>';

  drawLineChart(
    document.getElementById('poverty-chart'),
    POVERTY_SERIES.map((d) => ({ label: d.year, value: d.rate })),
    (v) => v.toFixed(2) + '%',
  );
}

function renderProvinces() {
  const total = PROVINCES.reduce((s, p) => s + p.population, 0);
  view.innerHTML =
    '<p class="kicker">Provinces</p>' +
    '<h1>Where Indonesians live</h1>' +
    '<p class="lede">Java holds more than half the country: the three Javanese provinces alone count ' +
    (PROVINCES[0].population + PROVINCES[1].population + PROVINCES[2].population).toFixed(1) +
    ' million people. These ten provinces hold ' + total.toFixed(1) +
    ' million — about two thirds of Indonesia.</p>' +
    '<section>' +
      '<h2>Largest provinces by population</h2>' +
      '<p class="section-note">Millions, BPS mid-year estimates 2024. Type to filter the table.</p>' +
      '<div class="card">' +
        '<div class="table-tools">' +
          '<input type="search" id="province-search" placeholder="Filter provinces…" aria-label="Filter provinces">' +
          '<span class="hint" id="province-count"></span>' +
        '</div>' +
        '<canvas class="chart" id="province-chart" role="img" aria-label="Bar chart of the ten largest provinces by population, West Java first at 50.35 million"></canvas>' +
        '<table class="data" id="province-table">' +
          '<thead><tr><th>Province</th><th>Capital</th><th class="num">Population (M)</th><th class="num">Share of Indonesia</th></tr></thead>' +
          '<tbody></tbody>' +
        '</table>' +
      '</div>' +
    '</section>';

  const tbody = document.querySelector('#province-table tbody');
  const count = document.getElementById('province-count');
  const search = document.getElementById('province-search');

  function fillRows(filter) {
    const q = (filter || '').trim().toLowerCase();
    const rows = PROVINCES.filter((p) => p.name.toLowerCase().includes(q));
    tbody.innerHTML = rows.map((p, i) => (
      '<tr' + (i === 0 && !q ? ' class="top-row"' : '') + '><td>' + p.name + '</td><td>' + p.capital +
      '</td><td class="num">' + p.population.toFixed(2) +
      '</td><td class="num">' + (p.population / 283.5 * 100).toFixed(1) + '%</td></tr>'
    )).join('') || '<tr><td colspan="4">No province matches that filter.</td></tr>';
    count.textContent = rows.length + ' of ' + PROVINCES.length + ' provinces shown';
  }

  search.addEventListener('input', () => fillRows(search.value));
  fillRows('');
  drawHBarChart(
    document.getElementById('province-chart'),
    PROVINCES.map((p, i) => ({ label: p.name, value: p.population, highlight: i === 0 })),
    (v) => v.toFixed(1) + 'M',
  );
}

function renderSources() {
  view.innerHTML =
    '<p class="kicker">Sources &amp; methods</p>' +
    '<h1>Where every number comes from</h1>' +
    '<p class="lede">A statistics site is only as good as its sources. Every figure on this site ' +
    'is drawn from the two sources below, and each page names the source and year beside the figure.</p>' +
    '<section>' +
      SOURCES.map((s) => (
        '<div class="card" style="margin-bottom:14px"><h3>' + s.name + '</h3>' +
        '<p>' + s.what + '</p>' +
        '<p class="source-note">' + s.note + '</p></div>'
      )).join('') +
    '</section>' +
    '<section>' +
      '<h2>How this site is built</h2>' +
      '<p class="section-note">Methods, in brief.</p>' +
      '<div class="card">' +
        '<ul class="fact-list">' +
          '<li><span>Figures</span><span class="fact-value">Quoted as published</span></li>' +
          '<li><span>Rounding</span><span class="fact-value">Shown to the precision published</span></li>' +
          '<li><span>Years</span><span class="fact-value">Named beside every figure</span></li>' +
          '<li><span>Network</span><span class="fact-value">None — fully offline</span></li>' +
        '</ul>' +
        '<p class="source-note">Population shares are computed from the published provincial ' +
        'estimates against the World Bank 2024 national total of 283.5 million. ' +
        'GDP per capita divides the World Bank GDP total by the World Bank population total.</p>' +
      '</div>' +
    '</section>';
}

const ROUTES = {
  '': renderOverview,
  economy: renderEconomy,
  people: renderPeople,
  provinces: renderProvinces,
  sources: renderSources,
};

export function render() {
  const route = (location.hash || '#/').replace(/^#\/?/, '').split('?')[0];
  const page = ROUTES[route] || ROUTES[''];
  document.querySelectorAll('.site-nav a').forEach((a) => {
    a.classList.toggle('active', (a.dataset.route || '') === (ROUTES[route] ? route : ''));
  });
  page();
  window.scrollTo(0, 0);
}
