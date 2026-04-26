# Awesome Digital Nepal ꨄ︎

> An atlas of Nepal's digital ecosystem — APIs, SDKs, datasets, libraries, fonts, models, and communities. Curated for developers, researchers, and the curious.

[![CC0 1.0](https://img.shields.io/badge/license-CC0%201.0-lightgrey)](https://creativecommons.org/publicdomain/zero/1.0/)
[![MIT (code)](https://img.shields.io/badge/code-MIT-blue)](./LICENSE-CODE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](./CONTRIBUTING.md)
[![Made with ꨄ︎ in Nepal](https://img.shields.io/badge/made%20with%20%EA%A8%84-in%20Nepal-B23A3A)](https://github.com/raazkhnl)

**🌐 Live site:** https://raazkhnl.github.io/awesome-digital-nepal/

A curated, community-maintained reference of every meaningful digital tool, API, SDK, dataset, library, and developer resource built **in**, **for**, or **commonly used in** Nepal — for development, research, and educational purposes.

Currently catalogues **315 resources** across **21 categories**.

---

## ✦ Why this exists

New developers in Nepal often don't know where to start. The information is scattered across blog posts, dead Postman workspaces, half-archived GitHub orgs, and unofficial Telegram groups. Specialist awesome-lists exist (see [§ Sister Lists](#-sister-lists)), but no single place ties them together — and no list covers the full breadth: government APIs, civic-tech, AI/NLP, fonts, podcasts, and the unique Nepali OSS ecosystem of date converters, validators, and locale tools.

This is the **horizontal aggregator**. It points to vertical specialists where they exist, and fills in the layers no one currently maintains.

---

## ✦ Quick start

Visit the [live site](https://raazkhnl.github.io/awesome-digital-nepal/) — it's elegant, searchable, and works on mobile.

Or browse the JSON catalog directly: every category lives in [`src/data/categories/`](./src/data/categories/) as a single, hand-editable JSON file.

To run locally:

```bash
git clone https://github.com/raazkhnl/awesome-digital-nepal.git
cd awesome-digital-nepal
npm install
npm run dev
```

Then open http://localhost:5173.

To produce a production build:

```bash
npm run build      # outputs to dist/
npm run preview    # serves the production build locally
```

---

## ✦ Categories

| # | Category | Tagline | Count |
|---|---|---|---:|
| 01 | [Government & e-Governance](./src/data/categories/01-government.json) | Citizen services, national ID, and government portals | 20 |
| 02 | [Documented Government APIs](./src/data/categories/02-government-apis.json) | The rare official Nepali government APIs with public documentation | 7 |
| 03 | [Open Data & Datasets](./src/data/categories/03-open-data.json) | Statistics, geospatial, humanitarian, and historical data | 14 |
| 04 | [Fintech & Payments](./src/data/categories/04-fintech.json) | Payment gateways, wallets, banking, and fintech APIs | 18 |
| 05 | [Stock Market & Trading](./src/data/categories/05-stock-market.json) | NEPSE data, IPO automation, and capital-market tools | 17 |
| 06 | [Telecom & SMS](./src/data/categories/06-telecom.json) | SMS gateways, USSD codes, and ISP developer resources | 12 |
| 07 | [Maps & Geospatial](./src/data/categories/07-maps-geo.json) | Nepal-specific maps, address APIs, and boundary datasets | 14 |
| 08 | [Nepali OSS Libraries](./src/data/categories/08-oss-libraries.json) | Date converters, formatters, validators, and helpers | 19 |
| 09 | [AI, ML & Nepali NLP](./src/data/categories/09-ai-nlp.json) | Language models, datasets, OCR, ASR, and translation for Nepali | 25 |
| 10 | [Fonts & Typography](./src/data/categories/10-fonts.json) | Unicode Devanagari fonts and Preeti↔Unicode converters | 11 |
| 11 | [Education & EdTech](./src/data/categories/11-education.json) | Learning platforms, university portals, and exam resources | 16 |
| 12 | [Health & Medical Tech](./src/data/categories/12-health.json) | EHR systems, telemedicine, and health datasets | 12 |
| 13 | [Agriculture, Tourism & Transport](./src/data/categories/13-agri-tourism-transport.json) | AgriTech, trekking permits, ride-hailing, and aviation | 18 |
| 14 | [News, Media & Calendar](./src/data/categories/14-news-media.json) | News portals, RSS feeds, and Hamro Patro ecosystem | 13 |
| 15 | [Weather, Environment & Disaster](./src/data/categories/15-weather-disaster.json) | Hydromet, air quality, seismic, and disaster portals | 14 |
| 16 | [E-Commerce & Jobs](./src/data/categories/16-ecommerce-jobs.json) | Online marketplaces, classifieds, and job boards | 12 |
| 17 | [Communities & Events](./src/data/categories/17-communities.json) | Developer communities, FOSS groups, hackathons, and conferences | 18 |
| 18 | [Blogs, Podcasts & YouTube](./src/data/categories/18-blogs-podcasts.json) | Tutorials, technical writing, and Nepali tech media | 14 |
| 19 | [Civic Tech & Transparency](./src/data/categories/19-civic-tech.json) | Open government, accountability, and data-for-good projects | 13 |
| 20 | [Notable Companies & OSS Orgs](./src/data/categories/20-companies.json) | Nepali tech companies with public open-source contributions | 16 |
| 21 | [Sister Awesome Lists](./src/data/categories/21-sister-lists.json) | Other curated lists covering the Nepali tech ecosystem | 12 |

**Stats:** 315 resources · 137 official · 161 community · 16 unofficial · 1 deprecated · **90 starred essentials**.

---

## ✦ How entries are tagged

Each resource carries metadata for at-a-glance decision-making:

| Tag | Meaning |
|---|---|
| **Official** | First-party project from the maintainer (government, company, or organization). |
| **Community** | Third-party but legitimately published — open-source libraries, indie projects. |
| **Unofficial** | Scrapers, reverse-engineered wrappers. May break; use with caution. |
| **Deprecated** | No longer maintained. Listed for historical / institutional memory. |
| **★ Starred** | First-class citizen for that category. |
| **Maintenance** | `active` (recent commits) · `stale` (>1yr quiet) · `archived` (explicitly archived). |
| **API surface** | `REST` · `GraphQL` · `SDK` · `Scraper` · `Form-only` · `No API`. |

The site surfaces all of these as visual badges so you can decide *can I use this in production?* not just *does this exist?*

---

## ✦ Project structure

```
awesome-digital-nepal/
├── src/
│   ├── data/
│   │   ├── categories/      ← All 21 category JSON files (the catalog)
│   │   ├── schema.json      ← JSON schema for validation
│   │   └── loader.js        ← Auto-imports every JSON, no manual wiring
│   ├── components/          ← Header, Footer, Cards, SearchBar, etc.
│   ├── pages/               ← Home, Category, Search, About, Disclaimer
│   ├── hooks/               ← useTheme, useSearch
│   ├── styles/index.css     ← Design tokens (light + dark)
│   ├── App.jsx
│   └── main.jsx
├── .github/
│   ├── workflows/deploy.yml ← Auto-deploy to GitHub Pages on push to main
│   ├── ISSUE_TEMPLATE/      ← Forms for new resources & broken links
│   └── PULL_REQUEST_TEMPLATE.md
├── public/                  ← Static assets (favicon)
├── README.md                ← You are here
├── CONTRIBUTING.md          ← How to add or fix a resource
├── CODE_OF_CONDUCT.md       ← Contributor Covenant 2.1
├── DISCLAIMER.md            ← Legal scope and warnings
├── LICENSE                  ← CC0 1.0 for the catalog content
├── LICENSE-CODE             ← MIT for the website source code
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

The site is deliberately modular — adding, editing, or removing a resource is a **one-file change**.

---

## ✦ Tech stack

- **React 18** + **Vite 5** — fast HMR, tiny production bundle
- **Tailwind CSS 3** with a custom design token system (light + dark)
- **React Router 6** with `HashRouter` so deep links work on GitHub Pages without server-side rewrites
- **Vite glob imports** — every category JSON is auto-discovered; no manual registration
- No backend, no database, no analytics — just a static site

Production bundle: **~85 KB gzipped JS, ~4 KB gzipped CSS** for the entire atlas.

---

## ✦ Design philosophy

The aesthetic direction is **"editorial atlas"** — a printed-feel layout with sophisticated serif display (Fraunces), warm parchment background, deep ink text, and a refined crimson accent inspired by Nepal's flag. The grain and rules echo old gazetteer pages while the typography stays modern. Saffron is used sparingly, like illuminated initials. Every page is meant to feel like it was *designed*, not *generated*.

| Token | Light | Dark |
|---|---|---|
| Background | `#F5F1E8` (parchment) | `#0E1218` (night sky) |
| Ink | `#1A1A1A` | `#E8E4D8` |
| Accent | `#B23A3A` (crimson) | `#D85F5F` |
| Highlight | `#E8A33D` (saffron) | `#F0B75A` |
| Secondary | `#2B3A4F` (indigo) | `#6B86A8` |

---

## ✦ Deployment

The repo includes a [GitHub Actions workflow](./.github/workflows/deploy.yml) that builds and deploys to GitHub Pages on every push to `main`.

**One-time setup** (in repo Settings → Pages):
1. Source: **GitHub Actions**
2. Save.

The site will then publish automatically to `https://<your-username>.github.io/awesome-digital-nepal/`.

If you fork to a different repo name, update `base` in [`vite.config.js`](./vite.config.js).

---

## ✦ Contributing

The repo is built so a contributor can add a resource by editing **exactly one file** — the JSON for the relevant category under [`src/data/categories/`](./src/data/categories/). No React or build knowledge required.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide, schema reference, and PR conventions.

**Quick path:**

1. Open the category file you want to add to (e.g. [`08-oss-libraries.json`](./src/data/categories/08-oss-libraries.json)).
2. Add a new object to the `resources` array following the [schema](./src/data/schema.json).
3. Open a PR using the template.

The PR template enforces the contribution checklist (description, status, maintenance evidence). Issues use guided forms for new-resource suggestions and broken-link reports.

---

## ✦ Sister lists

This atlas is the connective tissue, not a replacement. Several excellent specialist lists already exist — please contribute there too:

- [mesaugat/tech-companies-in-nepal](https://github.com/mesaugat/tech-companies-in-nepal) — 400+ Nepali tech companies (the gold standard, 343★)
- [IOST-ASCOL/nepali-datasets](https://github.com/IOST-ASCOL/nepali-datasets) — Nepali datasets index
- [pemagrg1/Nepali-Datasets](https://github.com/pemagrg1/Nepali-Datasets) — Long-running Nepali NLP datasets
- [amitness/ml-companies-in-nepal](https://github.com/amitness/ml-companies-in-nepal) + [amitness/ml-datasets](https://github.com/amitness/ml-datasets)
- [manibibek/payment-gateways-in-nepal](https://github.com/manibibek/payment-gateways-in-nepal) — Payment gateway integration reference
- [ghimiresunil/Curated-List-of-Nepali-NLP-Resources](https://github.com/ghimiresunil/Curated-List-of-Nepali-NLP-Resources)
- [GitHub topic: `made-in-nepal`](https://github.com/topics/made-in-nepal)

---

## ✦ Disclaimer

> This is an **unofficial, community-curated** list maintained for **development, research, and educational purposes**. It is not affiliated with the Government of Nepal, Nepal Rastra Bank, NEPSE, or any listed organization. Listed APIs, scrapers, and SDKs may change, become deprecated, or violate platform terms of service at any time. Use of any unofficial scraper is at your own risk; consult the upstream provider's terms of service before integrating into production. Inclusion in this list is not an endorsement.
>
> **Cryptocurrency trading is illegal in Nepal** — no crypto integrations are recommended for Nepal-based users, and none are listed here.

Full disclaimer: [DISCLAIMER.md](./DISCLAIMER.md).

---

## ✦ License

- **Catalog content** (everything under `src/data/`): [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) — public domain, no attribution required. See [LICENSE](./LICENSE).
- **Website source code**: [MIT](./LICENSE-CODE).

Use any of it, freely.

---

## ✦ Acknowledgements

This atlas would not exist without:
- The maintainers of **opensource-nepal**, **Open Knowledge Nepal**, **YoungInnovations**, **Kathmandu Living Labs**, **Leapfrog Technology**, **Khalti**, **Yarsa Labs**, **OLE Nepal**, **NAAMII**, and **Fusemachines** — who actually open-source their work.
- Curators behind **mesaugat/tech-companies-in-nepal**, **amitness/ml-***, **manibibek/payment-gateways-in-nepal**, **IOST-ASCOL/nepali-datasets**, **pemagrg1/Nepali-Datasets**, and **ghimiresunil/Curated-List-of-Nepali-NLP-Resources** — for the prior art that this list builds on.
- Every developer who's posted a Nepali date converter, Preeti-to-Unicode tool, or NEPSE scraper to a public repo. You made this possible.

---

<p align="center">
  <em>made with <strong style="color:#B23A3A">ꨄ︎</strong> by <a href="https://github.com/raazkhnl"><strong>@raazkhnl</strong></a></em>
</p>
