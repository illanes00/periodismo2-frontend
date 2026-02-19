import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200/80 bg-white dark:border-neutral-800/80 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-brand-700 text-xs font-bold text-white">P2</span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              &copy; {new Date().getFullYear()} Periodismo2. Agregador de noticias.
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
            <Link href="/about" className="transition hover:text-neutral-900 dark:hover:text-neutral-200">
              Acerca de
            </Link>
            <Link href="/feed.xml" className="transition hover:text-neutral-900 dark:hover:text-neutral-200">
              RSS Feed
            </Link>
            <a href="https://github.com/illanes00/periodismo2-frontend" target="_blank" rel="noopener noreferrer" className="transition hover:text-neutral-900 dark:hover:text-neutral-200">
              GitHub
            </a>
            <a href="https://api.periodismo2.cl/admin/" target="_blank" rel="noopener noreferrer" className="transition hover:text-neutral-900 dark:hover:text-neutral-200">
              Admin
            </a>
            <a href="https://api.periodismo2.cl/docs" target="_blank" rel="noopener noreferrer" className="transition hover:text-neutral-900 dark:hover:text-neutral-200">
              API
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
