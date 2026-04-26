import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

/**
 * Site header.
 *
 * - Sticks to top with a subtle bottom rule.
 * - Logo is a serif wordmark with a small crimson Nepali heart mark (ꨄ).
 * - Theme toggle uses sun/moon characters; respects reduced motion.
 */
export default function Header() {
  const [theme, toggleTheme] = useTheme()

  const linkClass = ({ isActive }) =>
    `font-sans text-sm tracking-tight transition-colors ${
      isActive ? 'text-crimson' : 'hover:text-crimson'
    }`

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur"
      style={{
        background: 'rgba(245, 241, 232, 0.85)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div className="container-page flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="Home">
          <span
            className="font-display text-2xl tracking-tightest font-medium"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            Awesome
            <span className="text-crimson"> Digital </span>
            Nepal
          </span>
          <span className="text-saffron text-lg leading-none -mt-0.5" aria-hidden="true">
            ꨄ︎
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          <NavLink to="/" end className={linkClass}>
            Atlas
          </NavLink>
          <NavLink to="/search" className={linkClass}>
            Search
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/disclaimer" className={linkClass}>
            Disclaimer
          </NavLink>
          <a
            href="https://github.com/raazkhnl/awesome-digital-nepal"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm tracking-tight hover:text-crimson transition-colors"
          >
            GitHub ↗
          </a>
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="text-base p-1.5 rounded hover:bg-rule/30 transition-colors"
            style={{ color: 'var(--ink-soft)' }}
          >
            {theme === 'dark' ? '☼' : '☾'}
          </button>
        </nav>

        {/* Mobile: minimal — just theme toggle, links go in mobile menu */}
        <div className="md:hidden flex items-center gap-3">
          <NavLink to="/search" className="text-base" aria-label="Search">⌕</NavLink>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-base p-1.5"
            style={{ color: 'var(--ink-soft)' }}
          >
            {theme === 'dark' ? '☼' : '☾'}
          </button>
        </div>
      </div>
    </header>
  )
}
