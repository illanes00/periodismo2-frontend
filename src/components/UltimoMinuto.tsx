'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { NewsItem } from '@/lib/types'
import { timeAgo } from '@/lib/utils'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.periodismo2.cl'

export function UltimoMinuto() {
  const [articles, setArticles] = useState<NewsItem[]>([])

  useEffect(() => {
    function fetchLatest() {
      fetch(`${API_BASE}/news/latest?limit=5`)
        .then((r) => { if (r.ok) return r.json(); throw new Error('not ok') })
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

  if (articles.length === 0) return null

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
          <h2 className="text-sm font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
            Ultimo Minuto
          </h2>
        </div>
        <div className="h-px flex-1 bg-red-200 dark:bg-red-900/50" />
      </div>
      <div className="space-y-0.5 rounded-xl border border-red-200/60 bg-white p-2 dark:border-red-900/40 dark:bg-neutral-900">
        {articles.map((item) => (
          <Link
            key={item.id}
            href={`/article/${item.id}`}
            className="group flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-neutral-900 transition group-hover:text-red-700 dark:text-neutral-100 dark:group-hover:text-red-400">
              {item.title}
            </span>
            {item.published_ts && (
              <time className="flex-shrink-0 text-xs text-neutral-400 dark:text-neutral-500">
                {timeAgo(item.published_ts)}
              </time>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
