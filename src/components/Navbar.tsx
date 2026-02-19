import Link from 'next/link'
import { SearchBar } from './SearchBar'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-red-700 dark:text-red-500">
          Periodismo2
        </Link>
        <div className="flex items-center gap-4">
          <SearchBar />
          <Link href="/about" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
            Acerca de
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
