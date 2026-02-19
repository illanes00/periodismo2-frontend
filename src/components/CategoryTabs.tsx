'use client'

import { useEffect, useState, useCallback } from 'react'
import type { NewsItem } from '@/lib/types'
import { NewsCard } from './NewsCard'

const CATEGORIES = [
  { slug: '', label: 'Todas' },
  { slug: 'politica', label: 'Politica' },
  { slug: 'economia', label: 'Economia' },
  { slug: 'deportes', label: 'Deportes' },
  { slug: 'tecnologia', label: 'Tecnologia' },
  { slug: 'ciencia', label: 'Ciencia' },
  { slug: 'entretenimiento', label: 'Entretenimiento' },
  { slug: 'salud', label: 'Salud' },
  { slug: 'mundo', label: 'Mundo' },
]

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.periodismo2.cl'

export function CategoryTabs() {
  const [active, setActive] = useState('')
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategory = useCallback(async (category: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: '12' })
      if (category) params.set('category', category)
      const res = await fetch(`${API_BASE}/news/latest?${params}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setItems(data.items || [])
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategory(active)
  }, [active, fetchCategory])

  return (
    <section>
      {/* Tab bar */}
      <div className="mb-6 flex items-center gap-3">
        <h2 className="shrink-0 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Categorias
        </h2>
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
      </div>

      <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActive(cat.slug)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              active === cat.slug
                ? 'bg-brand-600 text-white shadow-sm dark:bg-brand-700'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Content grid */}
      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white dark:border-neutral-800/80 dark:bg-neutral-900">
              <div className="skeleton aspect-[16/10]" />
              <div className="space-y-2 p-4">
                <div className="skeleton h-3 w-20 rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-3/4 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No hay noticias en esta categoria.
          </p>
        </div>
      )}
    </section>
  )
}
