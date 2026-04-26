# Contributing to Awesome Digital Nepal

Thank you for considering a contribution. The atlas is built so that adding a resource is as easy as editing **one file**. You do not need to know React or Tailwind — just JSON and a basic understanding of git.

## Table of Contents

- [Quick start](#quick-start)
- [What belongs in the atlas](#what-belongs-in-the-atlas)
- [What does NOT belong](#what-does-not-belong)
- [The data model](#the-data-model)
- [Adding a new resource](#adding-a-new-resource)
- [Adding a new category](#adding-a-new-category)
- [Updating an existing entry](#updating-an-existing-entry)
- [Reporting a broken link](#reporting-a-broken-link)
- [Contributing site code](#contributing-site-code)
- [Editorial conventions](#editorial-conventions)
- [Code of conduct](#code-of-conduct)

## Quick start

1. **Fork** this repo and clone your fork.
2. **Find** the right category file under `src/data/categories/` (or open a discussion if you think a new category is needed).
3. **Edit** that single JSON file, adding your entry following the schema.
4. **Open a pull request.** The PR template walks you through the checklist.

That's it. No build step required for catalog-only changes — though running `npm run build` locally is appreciated to confirm your JSON parses.

## What belongs in the atlas

A resource belongs here if it meets all of these:

1. It is **built in Nepal**, **built for Nepal**, or **commonly used in Nepal**.
2. It is **publicly accessible** — open source, free to use, or has a published API/SDK.
3. It is **relevant to developers, researchers, or tech-curious users** — not just end-consumer apps with no integration angle.
4. It is **maintained or has historical significance** (we keep some `Deprecated` entries for institutional memory).

Examples that fit: `Khalti SDKs`, `NRB Forex API`, `Nepali date converters`, `OSM Nepal datasets`, `NepBERTa`, `Nepali fonts`, `developer communities`, `Nepali tech companies that publish OSS`.

## What does NOT belong

- **Personal data sources at scale.** Voter rolls with PII, individual taxpayer records, citizenship databases — even if a public scraper exists. The Electronic Transactions Act 2063 places real liability on these uses.
- **Crypto integrations.** Cryptocurrency trading/mining/holding is illegal in Nepal under NRB regulations. Penalties are 3–7 years imprisonment. We do not link integrations.
- **Harmful scrapers.** Anything that systematically violates the upstream's ToS for harmful purposes, exfiltrates copyrighted content, or breaks rate limits.
- **Pure marketing pages** with no developer/research utility.
- **Spam, affiliate links, SEO-only sites.**

If you're unsure, open a discussion first.

## The data model

Each category file is a JSON object that looks like this:

```json
{
  "id": "fintech-payments",
  "title": "Fintech & Payments",
  "tagline": "Payment gateways, wallets, banking, and fintech APIs",
  "description": "Longer paragraph used at the top of the category page…",
  "icon": "₨",
  "order": 4,
  "resources": [
    {
      "name": "Khalti Developer Docs",
      "url": "https://docs.khalti.com",
      "description": "KPG2 single-integration aggregating wallet + eBanking + ConnectIPS + SCT/VISA. The most polished official multi-platform SDK story in Nepal.",
      "status": "official",
      "maintenance": "active",
      "api": "sdk",
      "starred": true,
      "tags": ["wallet", "aggregator"]
    }
  ]
}
```

Full schema in [`src/data/schema.json`](src/data/schema.json). Field reference:

| Field | Required | Values | Notes |
|---|---|---|---|
| `name` | ✅ | string | Resource name as the maintainer presents it |
| `url` | ✅ | URL | Canonical homepage or repo |
| `description` | ✅ | string | 1–3 factual sentences. No marketing copy. |
| `status` | ✅ | `official` `community` `unofficial` `deprecated` | See definitions below |
| `maintenance` | recommended | `active` `stale` `archived` `unknown` | "stale" = >1 yr no activity |
| `api` | recommended | `rest` `graphql` `sdk` `scraper` `webhook` `form` `none` | Best characterisation of how you'd integrate |
| `tags` | optional | string[] | Lowercase, hyphen-separated. Used by search. |
| `starred` | optional | boolean | Mark as essential / first-class for the category. **Use sparingly** — 3–5 per category max. |
| `note` | optional | string | Small caveat (legal, deprecation, usage warning) |

### Status definitions

- **`official`** — the resource is published by the first-party owner (the company, government body, or original author). Example: `developer.esewa.com.np`.
- **`community`** — third-party but legitimately produced and openly distributed. Example: `subeshb1/nepali-date-converter`.
- **`unofficial`** — scraper, reverse-engineered API, or wrapper around a service that does not publish a public API. Example: `surajrimal07/NepseAPI-Unofficial`.
- **`deprecated`** — historically significant but no longer maintained. Example: `QuakeMap.org`.

### Maintenance signals

Inspect the source's last activity:
- **`active`** — recent commits / updates within ~6 months
- **`stale`** — no activity in >1 year but not formally archived
- **`archived`** — explicitly archived on GitHub or wound down

## Adding a new resource

```bash
# 1. Find the right category
ls src/data/categories/

# 2. Open the file in your editor
# 3. Add a new object to the `resources` array
# 4. Validate that the JSON parses
npx jsonlint src/data/categories/04-fintech.json   # optional
# or simply: npm run build (Vite will fail loudly on invalid JSON)

# 5. Commit and open a PR
git checkout -b add/khalti-flutter-sdk
git add src/data/categories/04-fintech.json
git commit -m "feat(fintech): add Khalti Flutter SDK"
git push origin add/khalti-flutter-sdk
```

The PR template will walk you through the verification checklist.

## Adding a new category

Categories are physical files under `src/data/categories/`. To add one:

1. Pick a two-digit prefix that fits the order you want (between existing files, e.g., `09-something.json`).
2. Use a kebab-case `id` that will become the URL slug (`/category/cybersecurity`).
3. Pick an `order` integer that matches your filename prefix.
4. Pick a single-character `icon` (emoji, symbol, Devanagari character).
5. Open a discussion or PR with at least 5 starting resources.

The site auto-loads any file in this folder — no further code changes needed.

## Updating an existing entry

- **Description revision**: Edit in place, open a PR.
- **URL change**: Replace `url`, optionally add a `note: "Migrated from old-url.com"`.
- **Project archived**: Set `status` to `deprecated` and `maintenance` to `archived`.
- **Status promotion (e.g., a community SDK becomes official)**: Update `status` and add a brief commit message explaining.

## Reporting a broken link

Open a [broken-link issue](https://github.com/raazkhnl/awesome-digital-nepal/issues/new/choose). The weekly automated link checker also flags these — but human reports are faster.

## Contributing site code

For changes to the React app itself (components, pages, styling, hooks):

```bash
npm install
npm run dev   # http://localhost:5173
```

- Code style follows the existing conventions — Tailwind for styling, function components, hooks.
- Keep components small and focused. Reuse `ResourceCard`, `StatusBadge`, etc. wherever possible.
- All copy lives in component files — no separate i18n layer (yet).
- The design tokens are CSS variables defined in `src/styles/index.css`. Use them rather than hardcoding colors.
- Run `npm run build` before opening the PR.

## Editorial conventions

- **Tone**: factual, neutral, slightly editorial. Imagine writing for a printed gazetteer.
- **Length**: 1–3 sentences per `description`. Anything longer probably belongs in a project's own README.
- **Star sparingly**: `starred: true` is for the 3–5 resources someone starting in that category absolutely needs to know. If everything is starred, nothing is.
- **Don't duplicate**: if a sister list covers something exhaustively (e.g., `mesaugat/tech-companies-in-nepal` for companies), link the list rather than re-importing all its entries.
- **No "best", "top", "amazing"**: stick to what something is and does.
- **Mark caveats clearly**: legal warnings, deprecation notices, ToS concerns go in `note`.

## Code of conduct

Participation is governed by our [Code of Conduct](CODE_OF_CONDUCT.md) (Contributor Covenant 2.1). Be excellent to each other.

---

Thank you, again. Every fix and addition makes the atlas more useful for the next developer.

— [@raazkhnl](https://github.com/raazkhnl) ꨄ︎
