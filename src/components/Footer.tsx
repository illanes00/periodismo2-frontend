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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Legal
            </h3>
            <div className="flex flex-col gap-1.5">
              <Link href="/legal" className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200">
                Aviso Legal
              </Link>
              <Link href="/privacy" className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200">
                Privacidad
              </Link>
              <a href="mailto:contacto@periodismo2.cl" className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200">
                Contacto
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8">
          <NewsletterSignup />
        </div>

        {/* Social icons + Copyright */}
        <div className="mt-8 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              {/* X/Twitter */}
              <a
                href="https://x.com/periodismo2cl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en X"
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/periodismo2cl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              &copy; {new Date().getFullYear()} Periodismo2. Medio digital independiente.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
