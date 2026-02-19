'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import type { NewsItem } from '@/lib/types'
import { NewsCard } from './NewsCard'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.periodismo2.cl'

interface InfiniteNewsFeedProps {
  /** IDs of news items already shown on the page, to avoid duplicates */
  excludeIds?: string[]
}

export function InfiniteNewsFeed({ excludeIds = [] }: InfiniteNewsFeedProps) {
  const [items, setItems] = useState<NewsItem[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [initialLoaded, setInitialLoaded] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)
  const excludeSet = useRef(new Set(excludeIds))

  const fetchMore = useCallback(async (currentCursor: string | null) => {
    if (loading) return
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: '12' })
      if (currentCursor) params.set('before', currentCursor)
      const res = await fetch(`${API_BASE}/news/latest?${params}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      const newItems = (data.items || []).filter(
        (item: NewsItem) => !excludeSet.current.has(item.id)
      )
      // Add new item IDs to the exclude set
      newItems.forEach((item: NewsItem) => excludeSet.current.add(item.id))
      setItems((prev) => [...prev, ...newItems])
      setCursor(data.next_cursor || null)
      setHasMore(!!data.next_cursor)
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

  // Intersection observer for infinite scroll
  useEffect(() => {
    const el = observerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && cursor) {
          fetchMore(cursor)
        }
      },
      { rootMargin: '400px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, loading, cursor, fetchMore])

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <h2 className="shrink-0 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Mas noticias
        </h2>
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
      </div>

      {items.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
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

      {/* Infinite scroll trigger */}
      <div ref={observerRef} className="h-px" />

      {/* End state */}
      {!hasMore && items.length > 0 && (
        <p className="mt-8 text-center text-sm text-neutral-400 dark:text-neutral-600">
          No hay mas noticias por mostrar.
        </p>
      )}
    </section>
  )
}
