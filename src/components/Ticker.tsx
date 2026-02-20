'use client'

import { useEffect, useState } from 'react'
import type { TickerData, TrendingTopic } from '@/lib/types'
import { WeatherInline } from './WeatherWidget'
import { DateTimeDisplay } from './DateTimeDisplay'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.periodismo2.cl'

function RotatingIndicators({ indicators }: { indicators: { label: string; value: number; color: string }[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (indicators.length <= 1) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % indicators.length), 4000)
    return () => clearInterval(timer)
  }, [indicators.length])

  if (indicators.length === 0) return null
  const item = indicators[index]

  return (
    <span className="flex shrink-0 items-center gap-1.5 transition-opacity duration-300">
      <span className="font-semibold text-neutral-700 dark:text-neutral-300">{item.label}</span>
      <span className={item.color}>${item.value?.toLocaleString('es-CL')}</span>
    </span>
  )
}

export function Ticker() {
  const [data, setData] = useState<TickerData | null>(null)
  const [trending, setTrending] = useState<TrendingTopic[]>([])

  useEffect(() => {
    fetch(`${API_BASE}/api/indicators`)
      .then((r) => { if (r.ok) return r.json(); throw new Error('not ok') })
      .then((d) => setData(d))
      .catch(() => {})

    fetch(`${API_BASE}/news/trending-topics?hours=6`)
      .then((r) => { if (r.ok) return r.json(); throw new Error('not ok') })
      .then((topics) => {
        if (Array.isArray(topics)) setTrending(topics.slice(0, 5))
      })
      .catch(() => {})
  }, [])

  const indicators = data
    ? [
        { label: 'USD', value: data.dolar?.valor, color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'EUR', value: data.euro?.valor, color: 'text-blue-600 dark:text-blue-400' },
        { label: 'UF', value: data.uf?.valor, color: 'text-amber-600 dark:text-amber-400' },
      ].filter((i) => i.value)
    : []

  return (
    <div className="border-b border-neutral-200/60 bg-neutral-100/80 dark:border-neutral-800/60 dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-4 py-1.5 text-xs scrollbar-none sm:px-6 lg:px-8">
        {/* Date and time — hidden on mobile */}
        <span className="hidden sm:contents">
          <DateTimeDisplay />
          <span className="h-3 w-px shrink-0 bg-neutral-300 dark:bg-neutral-700" />
        </span>

        {/* Weather */}
        <WeatherInline />

        {/* Financial indicators — rotate one-at-a-time on mobile, show all on desktop */}
        {indicators.length > 0 && (
          <>
            <span className="h-3 w-px shrink-0 bg-neutral-300 dark:bg-neutral-700" />
            {/* Mobile: rotating single indicator */}
            <span className="sm:hidden">
              <RotatingIndicators indicators={indicators} />
            </span>
            {/* Desktop: all indicators */}
            <span className="hidden sm:contents">
              {indicators.map((item) => (
                <span key={item.label} className="flex shrink-0 items-center gap-1.5">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">{item.label}</span>
                  <span className={item.color}>${item.value?.toLocaleString('es-CL')}</span>
                </span>
              ))}
            </span>
          </>
        )}

        {/* Trending keywords — hidden on mobile */}
        {trending.length > 0 && (
          <span className="hidden md:contents">
            <span className="h-3 w-px shrink-0 bg-neutral-300 dark:bg-neutral-700" />
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
          </span>
        )}
      </div>
    </div>
  )
}
