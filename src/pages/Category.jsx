import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { categories, getCategoryById } from '../data/loader'
import ResourceCard from '../components/ResourceCard'
import StatusBadge from '../components/StatusBadge'

/**
 * Single-category page.
 *
 * Layout:
 *   1. Breadcrumb + category number
 *   2. Title + tagline + long description
 *   3. Status filter pills (with live counts)
 *   4. Two-column resource grid
 *   5. Prev/next category navigation
 */
const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'official', label: 'Official' },
  { id: 'community', label: 'Community' },
  { id: 'unofficial', label: 'Unofficial' },
  { id: 'starred', label: '★ Essentials' },
]

export default function Category() {
  const { id } = useParams()
  const category = getCategoryById(id)
  const [filter, setFilter] = useState('all')

  if (!category) return <Navigate to="/" replace />

  const idx = categories.findIndex((c) => c.id === id)
  const prev = idx > 0 ? categories[idx - 1] : null
  const next = idx < categories.length - 1 ? categories[idx + 1] : null

  const filtered = useMemo(() => {
    if (filter === 'all') return category.resources
    if (filter === 'starred') return category.resources.filter((r) => r.starred)
    return category.resources.filter((r) => r.status === filter)
  }, [category.resources, filter])

  const counts = useMemo(() => {
    const c = { all: category.resources.length, starred: 0 }
    for (const r of category.resources) {
      c[r.status] = (c[r.status] || 0) + 1
      if (r.starred) c.starred += 1
    }
    return c
  }, [category.resources])

  return (
    <article className="container-page py-12 md:py-16">
      {/* Breadcrumb */}
      <Link
        to="/"
        className="font-mono text-xs uppercase tracking-widest hover:text-crimson transition-colors"
        style={{ color: 'var(--ink-muted)' }}
      >
        ← Atlas Home
      </Link>

      {/* Header */}
      <header className="mt-6 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-9">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.25em] mb-3"
            style={{ color: 'var(--ink-muted)' }}
          >
            Section {String(category.order).padStart(2, '0')}
            {category.icon && <span className="ml-2">· {category.icon}</span>}
          </p>
          <h1
            className="font-display tracking-tightest leading-[1] mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {category.title}
          </h1>
          {category.tagline && (
            <p className="font-display italic text-2xl mb-6" style={{ color: 'var(--crimson)' }}>
              {category.tagline}
            </p>
          )}
          <p
            className="font-body text-lg leading-relaxed max-w-3xl"
            style={{ color: 'var(--ink-soft)' }}
          >
            {category.description}
          </p>
        </div>
        <div
          className="lg:col-span-3 lg:text-right lg:border-l lg:pl-8"
          style={{ borderColor: 'var(--rule)' }}
        >
          <div className="display-num text-7xl md:text-8xl text-crimson leading-none">
            {category.resources.length}
          </div>
          <div
            className="font-mono text-[11px] uppercase tracking-widest mt-2"
            style={{ color: 'var(--ink-muted)' }}
          >
            Resources catalogued
          </div>
        </div>
      </header>

      <hr className="rule-line mb-8" />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <span
          className="font-mono text-[11px] uppercase tracking-widest mr-2"
          style={{ color: 'var(--ink-muted)' }}
        >
          Show:
        </span>
        {STATUS_FILTERS.map((s) => {
          const c = counts[s.id] || 0
          if (c === 0 && s.id !== 'all') return null
          const active = filter === s.id
          return (
            <button
              key={s.id}
              onClick={() => setFilter(s.id)}
              className="font-mono text-xs px-2.5 py-1 transition-all"
              style={{
                background: active ? 'var(--ink)' : 'transparent',
                color: active ? 'var(--bg)' : 'var(--ink-soft)',
                border: '1px solid',
                borderColor: active ? 'var(--ink)' : 'var(--rule)',
                borderRadius: '2px',
              }}
            >
              {s.label} <span className="opacity-60 ml-1">({c})</span>
            </button>
          )
        })}
      </div>

      {/* Resource grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
        {filtered.map((r, i) => (
          <div
            key={r.url + r.name}
            className="animate-fade-up opacity-0"
            style={{ animationDelay: `${Math.min(i * 30, 400)}ms` }}
          >
            <ResourceCard resource={r} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          className="text-center py-16 font-body text-lg italic"
          style={{ color: 'var(--ink-muted)' }}
        >
          No resources match this filter.
        </div>
      )}

      {/* Prev/next */}
      <nav
        className="mt-20 pt-8 grid grid-cols-2 gap-6"
        style={{ borderTop: '1px solid var(--rule)' }}
      >
        {prev ? (
          <Link
            to={`/category/${prev.id}`}
            className="group block hover:text-crimson transition-colors"
          >
            <span
              className="font-mono text-[11px] uppercase tracking-widest"
              style={{ color: 'var(--ink-muted)' }}
            >
              ← Previous
            </span>
            <h3 className="font-display text-xl tracking-tight mt-1">
              {prev.title}
            </h3>
          </Link>
        ) : <div />}
        {next ? (
          <Link
            to={`/category/${next.id}`}
            className="group block text-right hover:text-crimson transition-colors"
          >
            <span
              className="font-mono text-[11px] uppercase tracking-widest"
              style={{ color: 'var(--ink-muted)' }}
            >
              Next →
            </span>
            <h3 className="font-display text-xl tracking-tight mt-1">
              {next.title}
            </h3>
          </Link>
        ) : <div />}
      </nav>
    </article>
  )
}
