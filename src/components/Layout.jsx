import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'

/**
 * Top-level layout. Mounted as the parent route in App.jsx so every page
 * shares the same Header/Footer chrome and gets a consistent
 * scroll-to-top-on-navigation behavior.
 */
export default function Layout() {
  const { pathname } = useLocation()

  // Reset scroll on every route change — otherwise category pages inherit
  // the scroll position of the previous one, which feels broken.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 animate-fade-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
