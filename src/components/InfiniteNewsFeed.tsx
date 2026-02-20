'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import type { NewsItem } from '@/lib/types'
import { NewsCard } from './NewsCard'
import { AdaptiveGrid } from './AdaptiveGrid'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.periodismo2.cl'
const PAGE_SIZE = 12

interface InfiniteNewsFeedProps {
  excludeIds?: string[]
}

export function InfiniteNewsFeed({ excludeIds = [] }: InfiniteNewsFeedProps) {
  const [items, setItems] = useState<NewsItem[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [initialLoaded, setInitialLoaded] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const excludeSet = useRef(new Set(excludeIds))

  const fetchMore = useCallback(async (currentCursor: string | null) => {
    if (loading) return
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: String(PAGE_SIZE) })
      if (currentCursor) params.set('before', currentCursor)
      const res = await fetch(`${API_BASE}/news/latest?${params}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      const newItems = (data.items || []).filter(
        (item: NewsItem) => !excludeSet.current.has(item.id)
      )
      newItems.forEach((item: NewsItem) => excludeSet.current.add(item.id))
      setItems((prev) => [...prev, ...newItems])
      setCursor(data.next_cursor || null)
      setHasMore(!!data.next_cursor)
      setPageCount((c) => c + 1)
    } catch {
      setHasMore(false)
    } finally {
      setLoading(false)
      setInitialLoaded(true)
    }
  }, [loading])

  // Initial load
  useEffect(() => {
    if (!initialLoaded) {
      fetchMore(null)
    }
  }, [initialLoaded, fetchMore])

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <h2 className="shrink-0 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Mas noticias
        </h2>
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        {pageCount > 0 && (
          <span className="shrink-0 text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
            Página {pageCount} · {items.length} noticias
          </span>
        )}
      </div>

      {items.length > 0 && (
        <AdaptiveGrid minItemWidth={280} className="gap-5">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </AdaptiveGrid>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
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
      )}

      {/* Manual "Load more" button */}
      {hasMore && !loading && cursor && (
        <div className="mt-8 text-center">
          <button
            onClick={() => fetchMore(cursor)}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
            Cargar más noticias
          </button>
        </div>
      )}

      {/* End state */}
      {!hasMore && items.length > 0 && (
        <p className="mt-8 text-center text-sm text-neutral-400 dark:text-neutral-600">
          No hay más noticias por mostrar.
        </p>
      )}
    </section>
  )
}
