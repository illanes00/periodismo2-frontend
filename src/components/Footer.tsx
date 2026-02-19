import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-6 text-sm text-neutral-500 dark:text-neutral-400 sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Periodismo2</p>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-neutral-800 dark:hover:text-neutral-200">Acerca de</Link>
          <Link href="/feed.xml" className="hover:text-neutral-800 dark:hover:text-neutral-200">RSS</Link>
        </div>
      </div>
    </footer>
  )
}
