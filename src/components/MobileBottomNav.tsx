'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  function handleTendenciasClick(e: React.MouseEvent) {
    e.preventDefault()
    if (pathname === '/') {
      // Already on homepage, scroll to trending section
      const el = document.getElementById('tendencias')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    // Navigate to homepage then scroll
    router.push('/#tendencias')
  }

  const isSearchActive = pathname === '/search'

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200/80 bg-white/95 backdrop-blur-lg md:hidden dark:border-neutral-800/80 dark:bg-neutral-950/95">
      <div className="flex items-center justify-around py-2">
        {/* Inicio */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition ${
            pathname === '/' ? 'text-brand-600 dark:text-brand-500' : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="font-medium">Inicio</span>
        </Link>

        {/* Buscar */}
        <Link
          href="/search"
          className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition ${
            isSearchActive ? 'text-brand-600 dark:text-brand-500' : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <span className="font-medium">Buscar</span>
        </Link>

        {/* Tendencias */}
        <a
          href="/#tendencias"
          onClick={handleTendenciasClick}
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-xs text-neutral-500 transition dark:text-neutral-400"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
          </svg>
          <span className="font-medium">Tendencias</span>
        </a>

        {/* Acerca de */}
        <Link
          href="/about"
          className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition ${
            pathname === '/about' ? 'text-brand-600 dark:text-brand-500' : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <span className="font-medium">Acerca de</span>
        </Link>
      </div>
    </nav>
  )
}
