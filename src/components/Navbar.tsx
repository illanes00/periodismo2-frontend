import Link from 'next/link'
import { SearchBar } from './SearchBar'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-lg dark:border-neutral-800/80 dark:bg-neutral-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white transition group-hover:bg-brand-800">
              P2
            </span>
            <span className="hidden font-serif text-lg font-bold tracking-tight text-neutral-900 dark:text-white sm:block">
              Periodismo<span className="text-brand-600">2</span>
            </span>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            <Link href="/" className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100">
              Inicio
            </Link>
            <Link href="/entities" className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100">
              Entidades
            </Link>
            <Link href="/about" className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100">
              Acerca de
            </Link>
            <Link href="/feed.xml" className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100">
              RSS
            </Link>
            <a href="https://api.periodismo2.cl/admin/" target="_blank" rel="noopener noreferrer" className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100">
              Admin
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
