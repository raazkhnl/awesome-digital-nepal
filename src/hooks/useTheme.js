import { useEffect, useState } from 'react'

/**
 * Theme management hook.
 *
 * - Reads initial theme from localStorage, falling back to the OS-level
 *   `prefers-color-scheme` media query.
 * - Toggles a `dark` class on the <html> element (Tailwind's `darkMode: 'class'`
 *   is configured to read this).
 * - Persists every change to localStorage so the theme survives reloads.
 *
 * Returns `[theme, toggleTheme]` where theme is 'light' | 'dark'.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem('adn-theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('adn-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return [theme, toggleTheme]
}
