'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchBar } from './SearchBar'
import { ThemeToggle } from './ThemeToggle'

const NAV_CATEGORIES = [
  { slug: 'politica', label: 'Política' },
  { slug: 'economia', label: 'Economía' },
  { slug: 'deportes', label: 'Deportes' },
  { slug: 'tecnologia', label: 'Tecnología' },
  { slug: 'entretenimiento', label: 'Entretenimiento' },
  { slug: 'mundo', label: 'Mundo' },
  { slug: 'cultura', label: 'Cultura' },
  { slug: 'ciencia', label: 'Ciencia' },
  { slug: 'salud', label: 'Salud' },
  { slug: 'pais', label: 'País' },
]

const NAV_LINKS = [
  { href: '/editorial', label: 'Editorial' },
  { href: '/about', label: 'Nosotros' },
]

const linkClass = 'rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'

export function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [dropdownOpen])

  // Close dropdown on navigation
  useEffect(() => {
    setDropdownOpen(false)
  }, [pathname])

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-lg dark:border-neutral-800/80 dark:bg-neutral-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 md:gap-8">
            {/* Hamburger button - mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 md:hidden dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              aria-label="Abrir menú"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            <Link href="/" className="group flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white transition group-hover:bg-brand-800">
                P2
              </span>
              <span className="hidden font-serif text-lg font-bold tracking-tight text-neutral-900 dark:text-white sm:block">
                Periodismo<span className="text-brand-600">2</span>
              </span>
            </Link>

            {/* Desktop nav: Portada | Secciones ▾ | Editorial | Nosotros */}
            <div className="hidden items-center gap-1 md:flex">
              <Link href="/" className={linkClass}>
                Portada
              </Link>

              {/* All categories in a single dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`${linkClass} inline-flex items-center gap-1`}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  Secciones
                  <svg className={`h-3.5 w-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 grid w-64 grid-cols-2 gap-px rounded-xl border border-neutral-200/80 bg-white p-2 shadow-lg dark:border-neutral-800/80 dark:bg-neutral-900">
                    {NAV_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SearchBar />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden dark:bg-neutral-900 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
            <Link href="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white">
                P2
              </span>
              <span className="font-serif text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                Periodismo<span className="text-brand-600">2</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              aria-label="Cerrar menú"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <Link
              href="/"
              onClick={() => setSidebarOpen(false)}
              className={`mb-1 flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                pathname === '/'
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400'
                  : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
              }`}
            >
              <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Portada
            </Link>

            {/* Categories section */}
            <div className="mb-2 mt-4 px-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Categorías
              </p>
            </div>
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setSidebarOpen(false)}
                className="mb-0.5 flex items-center rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                {cat.label}
              </Link>
            ))}

            {/* Other links */}
            <div className="mb-2 mt-4 px-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Secciones
              </p>
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`mb-0.5 flex items-center rounded-lg px-3 py-2 text-sm font-medium transition ${
                  pathname === link.href
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400'
                    : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
