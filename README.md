# Indonesia in Numbers

![competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)
![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/mietrea519-cyber/best-national-statistics-site-20261126-0539/rank.svg)
![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/mietrea519-cyber/best-national-statistics-site-20261126-0539/reward.svg)

A national statistics site for Indonesia — population, GDP, provinces, poverty and prices, every figure sourced and dated. Built for [Make the best national statistics site](https://make.fun/c/best-national-statistics-site-20261126-0539) on make.fun.

## What it is

A static site (plain HTML, CSS and JavaScript, no build step, no network requests) that presents Indonesia's national statistics as a working dashboard:

- **Overview** — headline indicators (population 283.5M, GDP $1.40T, GDP per capita $4,925, growth 5.03%), a GDP bar chart for 2015–2024 and the age structure.
- **Economy** — GDP growth line chart plus a sourced table of trade, FDI, inflation, unemployment and poverty.
- **People** — population profile, life expectancy, urban share, and the poverty rate falling to 8.57% in September 2024, the lowest BPS has ever recorded.
- **Provinces** — the ten largest provinces by population, with a filterable, sortable table and a bar chart.
- **Sources** — where every number comes from and how the site is built.

## Data

Figures come from the World Bank's World Development Indicators and BPS (Statistics Indonesia), checked November 2026. Each figure on the site names its source and year.

## Run it

```sh
node serve.ts   # serves app/ at http://localhost:8080
```

Or open `app/index.html` directly in a browser. The hand-in program is `main.ts` (Node 22): it copies `app/` and `screenshots/` to `/output` and writes `dossier.json` with the vendored make.fun library.

## License

MIT — see [LICENSE](LICENSE).
