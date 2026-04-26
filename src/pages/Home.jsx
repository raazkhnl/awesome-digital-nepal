import { Link } from 'react-router-dom'
import { categories, getStats } from '../data/loader'
import CategoryCard from '../components/CategoryCard'

/**
 * Atlas home page.
 *
 * Three sections:
 *   1. Editorial hero — display serif headline with crimson accent + stats line
 *   2. Category grid — every category surfaced as a CategoryCard
 *   3. Closing CTA — invite contributions
 *
 * The hero deliberately uses asymmetric grid alignment and oversized type to
 * read like a gazetteer cover, not a SaaS landing page.
 */
export default function Home() {
  const stats = getStats()

  return (
    <>
      {/* HERO */}
      <section className="container-page pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.25em] mb-6"
              style={{ color: 'var(--ink-muted)' }}
            >
              <span className="dot dot-active mr-1"></span>
              Volume I · Edition 2026 · An Open Atlas
            </p>
            <h1
              className="font-display tracking-tightest leading-[0.95] mb-8"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                fontVariationSettings: '"opsz" 144, "SOFT" 100',
                fontWeight: 400,
              }}
            >
              The digital
              <br />
              ecosystem of
              <br />
              <span className="text-crimson italic">Nepal</span>
              <span className="text-saffron"> ꨄ︎</span>
            </h1>
            <p
              className="font-body text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: 'var(--ink-soft)' }}
            >
              A curated, community-maintained atlas of every meaningful digital
              tool, API, SDK, dataset, library, and developer resource built
              <em> in</em>, <em>for</em>, or <em>commonly used in</em> Nepal —
              for development, research, and educational purposes.
            </p>
          </div>

          {/* Stats column */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6">
            <Stat n={stats.categories} label="Categories" />
            <Stat n={stats.resources} label="Resources" />
            <Stat n={stats.starred} label="Essentials" />
            <Stat n={stats.official} label="Official" />
          </div>
        </div>
      </section>

      {/* RULE + SECTION HEADER */}
      <div className="container-page">
        <hr className="rule-line" />
        <div className="flex items-baseline justify-between py-6 flex-wrap gap-4">
          <h2
            className="font-display text-3xl md:text-4xl tracking-tight"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            Browse by category
          </h2>
          <Link
            to="/search"
            className="font-mono text-xs uppercase tracking-widest hover:text-crimson transition-colors"
            style={{ color: 'var(--ink-muted)' }}
          >
            ⌕ Or search the full atlas →
          </Link>
        </div>
      </div>

      {/* GRID */}
      <section className="container-page pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              className="animate-fade-up opacity-0 flex h-full"
              style={{ animationDelay: `${Math.min(i * 40, 600)}ms` }}
            >
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-24">
        <div
          className="p-10 md:p-14 text-center"
          style={{
            background: 'var(--ink)',
            color: 'var(--bg)',
          }}
        >
          <p
            className="font-mono text-[11px] uppercase tracking-[0.25em] mb-4 opacity-60"
          >
            Public domain · Always open
          </p>
          <h2
            className="font-display tracking-tightest mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontVariationSettings: '"opsz" 144',
              color: 'var(--bg)',
            }}
          >
            Spotted something missing?
          </h2>
          <p className="font-body text-lg max-w-xl mx-auto mb-8 opacity-80">
            This atlas grows with the community. Add a resource by editing
            a single JSON file — no React knowledge required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/raazkhnl/awesome-digital-nepal/issues/new/choose"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm px-5 py-2.5 transition-colors"
              style={{
                background: 'var(--crimson)',
                color: '#fff',
              }}
            >
              Suggest a Resource ↗
            </a>
            <a
              href="https://github.com/raazkhnl/awesome-digital-nepal/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm px-5 py-2.5 transition-colors"
              style={{
                border: '1px solid var(--bg)',
                color: 'var(--bg)',
              }}
            >
              Contribution guide
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

function Stat({ n, label }) {
  return (
    <div>
      <div
        className="display-num text-5xl md:text-6xl"
        style={{ color: 'var(--ink)' }}
      >
        {n}
      </div>
      <div
        className="font-mono text-[10px] uppercase tracking-widest mt-1"
        style={{ color: 'var(--ink-muted)' }}
      >
        {label}
      </div>
    </div>
  )
}
