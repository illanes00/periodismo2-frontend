'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const FILTER_CATEGORIES = [
  { slug: '', label: 'Todas' },
  { slug: 'politica', label: 'Política' },
  { slug: 'economia', label: 'Economía' },
  { slug: 'deportes', label: 'Deportes' },
  { slug: 'tecnologia', label: 'Tecnología' },
  { slug: 'cultura', label: 'Cultura' },
  { slug: 'mundo', label: 'Mundo' },
  { slug: 'ciencia', label: 'Ciencia' },
  { slug: 'salud', label: 'Salud' },
]

export function CategoryFilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || ''

  function handleClick(slug: string) {
    if (slug) {
      router.push(`/category/${slug}`)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="sticky top-[57px] z-40 border-b border-neutral-200/80 bg-white/95 backdrop-blur-lg dark:border-neutral-800/80 dark:bg-neutral-950/95">
      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 scrollbar-none sm:px-6 lg:px-8">
        <span className="mr-1 shrink-0 text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Filtrar:</span>
        {FILTER_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.slug
          return (
            <button
              key={cat.slug}
              onClick={() => handleClick(cat.slug)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
