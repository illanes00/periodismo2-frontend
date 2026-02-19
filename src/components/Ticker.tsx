'use client'

import { useEffect, useState } from 'react'
import type { TickerData, TrendingTopic } from '@/lib/types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.periodismo2.cl'

export function Ticker() {
  const [data, setData] = useState<TickerData | null>(null)
  const [trending, setTrending] = useState<TrendingTopic[]>([])

  useEffect(() => {
    fetch('https://mindicador.cl/api')
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {})

    fetch(`${API_BASE}/news/trending-topics?hours=6`)
      .then((r) => r.json())
      .then((topics: TrendingTopic[]) => setTrending(topics.slice(0, 5)))
      .catch(() => {})
  }, [])

  if (!data && trending.length === 0) return null

  const indicators = data
    ? [
        { label: 'USD', value: data.dolar?.valor, color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'EUR', value: data.euro?.valor, color: 'text-blue-600 dark:text-blue-400' },
        { label: 'UF', value: data.uf?.valor, color: 'text-amber-600 dark:text-amber-400' },
        { label: 'UTM', value: data.utm?.valor, color: 'text-purple-600 dark:text-purple-400' },
      ].filter((i) => i.value)
    : []

  return (
    <div className="border-b border-neutral-200/60 bg-neutral-100/80 dark:border-neutral-800/60 dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-4 py-1.5 text-xs scrollbar-none sm:px-6 lg:px-8">
        {/* Financial indicators */}
        {indicators.length > 0 && (
          <>
            <span className="shrink-0 font-medium text-neutral-500 dark:text-neutral-500">Indicadores</span>
            <span className="h-3 w-px bg-neutral-300 dark:bg-neutral-700" />
            {indicators.map((item) => (
              <span key={item.label} className="flex shrink-0 items-center gap-1.5">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">{item.label}</span>
                <span className={item.color}>${item.value?.toLocaleString('es-CL')}</span>
              </span>
            ))}
          </>
        )}

        {/* Trending keywords */}
        {trending.length > 0 && (
          <>
            <span className="h-3 w-px bg-neutral-300 dark:bg-neutral-700" />
            <span className="shrink-0 font-medium text-brand-600 dark:text-brand-500">Tendencias</span>
            {trending.map((topic) => (
              <a
                key={topic.keyword}
                href={`/search?q=${encodeURIComponent(topic.keyword)}`}
                className="shrink-0 font-medium text-neutral-600 transition hover:text-brand-700 dark:text-neutral-400 dark:hover:text-brand-400"
              >
                {topic.keyword}
              </a>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
