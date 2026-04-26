import { Link } from 'react-router-dom'

/**
 * Compact card that previews a category on the home page grid.
 *
 * The big serif numeral is the order index — it gives the home page a
 * gazetteer feel and helps the eye scan. Hovering reveals an arrow.
 */
export default function CategoryCard({ category }) {
  const { id, title, tagline, icon, order, resources } = category
  const num = String(order).padStart(2, '0')

  return (
    <Link
      to={`/category/${id}`}
      className="group flex flex-col p-6 transition-all duration-200 h-full w-full relative overflow-hidden"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--rule)',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className="display-num text-5xl"
          style={{ color: 'var(--rule)', transition: 'color 0.2s' }}
        >
          {num}
        </span>
        {icon && (
          <span
            className="text-2xl group-hover:text-crimson transition-colors"
            style={{ color: 'var(--ink-muted)' }}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
      </div>

      <h3 className="font-display text-2xl tracking-tight leading-tight mb-1.5 group-hover:text-crimson transition-colors">
        {title}
      </h3>
      {tagline && (
        <p className="font-body text-sm leading-snug mb-4" style={{ color: 'var(--ink-soft)' }}>
          {tagline}
        </p>
      )}

      <div
        className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest pt-3 mt-auto"
        style={{ borderTop: '1px solid var(--rule)', color: 'var(--ink-muted)' }}
      >
        <span>{resources.length} resources</span>
        <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
          →
        </span>
      </div>
    </Link>
  )
}
