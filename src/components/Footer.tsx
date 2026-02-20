import Link from 'next/link'
import { NewsletterSignup } from './NewsletterSignup'

const FOOTER_CATEGORIES = [
  { slug: 'politica', label: 'Política' },
  { slug: 'economia', label: 'Economía' },
  { slug: 'deportes', label: 'Deportes' },
  { slug: 'tecnologia', label: 'Tecnología' },
  { slug: 'mundo', label: 'Mundo' },
  { slug: 'ciencia', label: 'Ciencia' },
  { slug: 'salud', label: 'Salud' },
  { slug: 'cultura', label: 'Cultura' },
  { slug: 'entretenimiento', label: 'Entretenimiento' },
  { slug: 'pais', label: 'País' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200/80 bg-white dark:border-neutral-800/80 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-brand-700 text-xs font-bold text-white">P2</span>
              <span className="font-serif text-sm font-bold text-neutral-900 dark:text-white">
                Periodismo<span className="text-brand-600">2</span>
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Medio digital independiente dedicado a informar con precisión y profundidad.
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Categorías
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {FOOTER_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Navegación
            </h3>
            <div className="flex flex-col gap-1.5">
              <Link href="/about" className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200">
                Acerca de
              </Link>
              <Link href="/editorial" className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200">
                Editorial
              </Link>
              <Link href="/feed.xml" className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200">
                RSS Feed
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8">
          <NewsletterSignup />
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <p className="text-center text-xs text-neutral-400 dark:text-neutral-500">
            &copy; {new Date().getFullYear()} Periodismo2. Medio digital independiente.
          </p>
        </div>
      </div>
    </footer>
  )
}
