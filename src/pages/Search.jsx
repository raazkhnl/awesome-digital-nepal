import { useState } from 'react'
import { useSearch } from '../hooks/useSearch'
import { categories } from '../data/loader'
import SearchBar from '../components/SearchBar'
import ResourceCard from '../components/ResourceCard'
import { Link } from 'react-router-dom'

/**
 * Global search page — query across every resource in the atlas with status
 * and category filters. Results are grouped by category so users land on the
 * relevant section quickly.
 */
export default function Search() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const results = useSearch(query, { status, category: categoryFilter })

  // Group results by category for display
  const grouped = results.reduce((acc, r) => {
    if (!acc[r.categoryId]) {
      acc[r.categoryId] = { title: r.categoryTitle, items: [] }
    }
    acc[r.categoryId].items.push(r)
    return acc
  }, {})

  return (
    <div className="container-page py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.25em] mb-3"
          style={{ color: 'var(--ink-muted)' }}
        >
          Index
        </p>
        <h1
          className="font-display tracking-tightest leading-[1] mb-3"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontVariationSettings: '"opsz" 144',
          }}
        >
          Search the atlas
        </h1>
        <p className="font-body text-lg max-w-2xl" style={{ color: 'var(--ink-soft)' }}>
          Live filter across every category. Try{' '}
          <em>"NEPSE"</em>, <em>"date converter"</em>, <em>"open data"</em>, or
          a tag like <em>"flutter"</em>.
        </p>
      </div>

      {/* Search controls */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        status={status}
        setStatus={setStatus}
        count={results.length}
      />

      {/* Category select for additional filtering */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span
          className="font-mono text-[11px] uppercase tracking-widest mr-2"
          style={{ color: 'var(--ink-muted)' }}
        >
          Category:
        </span>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="font-mono text-xs px-2.5 py-1.5 bg-transparent"
          style={{
            border: '1px solid var(--rule)',
            color: 'var(--ink)',
            borderRadius: '2px',
          }}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <hr className="rule-line my-10" />

      {/* Results */}
      {results.length === 0 ? (
        <div
          className="text-center py-16 font-body text-lg italic"
          style={{ color: 'var(--ink-muted)' }}
        >
          {query ? (
            <>
              No matches for <span className="text-crimson not-italic">"{query}"</span>.
              Try a broader term or{' '}
              <a
                href="https://github.com/raazkhnl/awesome-digital-nepal/issues/new/choose"
                target="_blank"
                rel="noopener noreferrer"
                className="link-ink not-italic"
              >
                suggest a resource
              </a>
              .
            </>
          ) : (
            'Start typing above to search the atlas.'
          )}
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(grouped).map(([catId, group]) => (
            <section key={catId}>
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="font-display text-2xl tracking-tight">
                  {group.title}
                </h2>
                <Link
                  to={`/category/${catId}`}
                  className="font-mono text-[11px] uppercase tracking-widest hover:text-crimson transition-colors"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  View category →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
                {group.items.map((r) => (
                  <ResourceCard key={r.url + r.name} resource={r} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
