import { Link } from 'react-router-dom'
import { getStats } from '../data/loader'

/**
 * About page — long-form prose explaining the project's purpose, editorial
 * philosophy, and how to contribute. Designed like an editor's note in a
 * printed gazetteer.
 */
export default function About() {
  const stats = getStats()

  return (
    <article className="container-page py-12 md:py-16 max-w-3xl">
      <p
        className="font-mono text-[11px] uppercase tracking-[0.25em] mb-3"
        style={{ color: 'var(--ink-muted)' }}
      >
        Editor's Note
      </p>
      <h1
        className="font-display tracking-tightest leading-[1] mb-8"
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontVariationSettings: '"opsz" 144',
        }}
      >
        About this atlas
      </h1>

      <div
        className="prose-content font-body text-lg leading-[1.75] space-y-6"
        style={{ color: 'var(--ink-soft)' }}
      >
        <p className="text-2xl font-display italic" style={{ color: 'var(--ink)' }}>
          New developers in Nepal often don't know where to start. This is a
          homepage for the Nepali developer ecosystem — a connective tissue
          between the specialist lists already out there.
        </p>

        <p>
          Awesome Digital Nepal is a curated, community-maintained reference of
          every meaningful digital tool, API, SDK, dataset, library, and
          developer resource built <em>in</em>, <em>for</em>, or{' '}
          <em>commonly used in</em> Nepal. It currently catalogues{' '}
          <strong style={{ color: 'var(--ink)' }}>{stats.resources} resources</strong>{' '}
          across <strong style={{ color: 'var(--ink)' }}>{stats.categories} categories</strong>,
          ranging from documented government APIs and payment SDKs to
          open-source Nepali date pickers, Nepali NLP models, font converters,
          civic-tech projects, and developer communities.
        </p>

        <h2
          className="font-display text-3xl tracking-tight pt-6"
          style={{ color: 'var(--ink)' }}
        >
          What goes in
        </h2>
        <p>
          Every entry is tagged with a <strong>status</strong> (Official,
          Community, Unofficial, Deprecated), a{' '}
          <strong>maintenance signal</strong> (Active, Stale, Archived), and an{' '}
          <strong>API surface</strong> (REST, SDK, scraper, form-only, none).
          The goal is to help readers make a real decision: <em>can I use
          this in production?</em> rather than just <em>does this exist?</em>
        </p>

        <h2
          className="font-display text-3xl tracking-tight pt-6"
          style={{ color: 'var(--ink)' }}
        >
          What stays out
        </h2>
        <p>
          Sources that exfiltrate personal data at scale, projects that violate
          platform terms of service for harmful purposes, and integrations for
          activities that are illegal in Nepal (cryptocurrency trading is
          banned by Nepal Rastra Bank). We list the upstream{' '}
          <em>official</em> source first whenever one exists, and clearly mark
          unofficial scrapers so readers can make informed choices.
        </p>

        <h2
          className="font-display text-3xl tracking-tight pt-6"
          style={{ color: 'var(--ink)' }}
        >
          How to contribute
        </h2>
        <p>
          The repository is built so a contributor can add a resource by editing{' '}
          <em>exactly one file</em> — the JSON file for the relevant category
          under <code className="font-mono text-sm px-1.5 py-0.5" style={{ background: 'var(--card)', border: '1px solid var(--rule)' }}>src/data/categories/</code>.
          No React or build knowledge required. The schema is documented at{' '}
          <code className="font-mono text-sm px-1.5 py-0.5" style={{ background: 'var(--card)', border: '1px solid var(--rule)' }}>src/data/schema.json</code>{' '}
          and the contributor guide on GitHub walks through PR conventions.
        </p>
        <p>
          Found a broken link? A stale entry? A category with thin coverage?
          Open an issue — every fix counts.
        </p>

        <h2
          className="font-display text-3xl tracking-tight pt-6"
          style={{ color: 'var(--ink)' }}
        >
          Differentiation
        </h2>
        <p>
          Several excellent specialist lists already exist — see our{' '}
          <Link to="/category/sister-lists" className="link-ink">
            Sister Lists
          </Link>{' '}
          page. This atlas positions itself as the <em>horizontal aggregator</em>:
          a single destination that points to those vertical specialists while
          adding the layers no one currently maintains — government APIs,
          civic-tech, AI/NLP, fonts, podcasts, and the unique Nepali OSS
          ecosystem of date converters, validators, and locale tools.
        </p>

        <h2
          className="font-display text-3xl tracking-tight pt-6"
          style={{ color: 'var(--ink)' }}
        >
          Licensing
        </h2>
        <p>
          The catalog content is released under{' '}
          <a
            href="https://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink"
          >
            CC0 1.0
          </a>{' '}
          — public domain, no attribution required. The site's source code is
          MIT-licensed. Use any of it, freely.
        </p>
      </div>

      <div
        className="mt-16 p-8"
        style={{ background: 'var(--card)', border: '1px solid var(--rule)' }}
      >
        <p
          className="font-mono text-[11px] uppercase tracking-widest mb-2"
          style={{ color: 'var(--ink-muted)' }}
        >
          Maintained by
        </p>
        <p className="font-display text-2xl">
          <a
            href="https://github.com/raazkhnl"
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink"
          >
            @raazkhnl
          </a>
          <span className="text-saffron ml-2">ꨄ︎</span>
        </p>
        <p className="mt-2 font-body" style={{ color: 'var(--ink-soft)' }}>
          Pull requests welcome from anyone. The atlas is for everyone.
        </p>
      </div>
    </article>
  )
}
