'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { NewsItem } from '@/lib/types'
import { formatSmartTime } from '@/lib/utils'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.periodismo2.cl'

export function UltimasColumn() {
  const [articles, setArticles] = useState<NewsItem[]>([])

  useEffect(() => {
    function fetchLatest() {
      fetch(`${API_BASE}/news/latest?limit=12`)
        .then((r) => {
          if (r.ok) return r.json()
          throw new Error('not ok')
        })
        .then((data) => {
          if (data?.items && Array.isArray(data.items)) {
            setArticles(data.items)
          }
        })
        .catch(() => {})
    }

    fetchLatest()
    const interval = setInterval(fetchLatest, 60_000)
    return () => clearInterval(interval)
  }, [])

  if (articles.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-200/80 bg-white p-4 dark:border-neutral-800/80 dark:bg-neutral-900">
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="skeleton h-4 w-12 rounded" />
              <div className="skeleton h-4 flex-1 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-red-200/60 bg-white dark:border-red-900/40 dark:bg-neutral-900">
      <div className="flex items-center gap-2 border-b border-red-200/60 px-4 py-3 dark:border-red-900/40">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        <h2 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
          Último Minuto
        </h2>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
        {articles.map((item) => (
          <Link
            key={item.id}
            href={`/article/${item.id}`}
            className="group flex gap-3 px-4 py-2.5 transition hover:bg-red-50/50 dark:hover:bg-red-950/20"
          >
            {item.published_ts && (
              <time className="mt-0.5 w-11 flex-shrink-0 text-xs font-semibold tabular-nums text-red-500 dark:text-red-400">
                {formatSmartTime(item.published_ts)}
              </time>
            )}
            <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-neutral-800 transition group-hover:text-red-700 dark:text-neutral-200 dark:group-hover:text-red-400">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
