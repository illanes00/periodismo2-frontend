'use client'

import { useEffect, useState } from 'react'
import { SparklineChart } from './SparklineChart'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.periodismo2.cl'

interface Props {
  indicator: string
  label: string
  unit?: string
  days: number
}

interface HistoryData {
  series: { date: string; value: number }[]
}

export function FinancialWidget({ indicator, label, unit = '$', days }: Props) {
  const [data, setData] = useState<HistoryData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/indicators/${indicator}/history?days=${days}`)
      .then((r) => {
        if (r.ok) return r.json()
        throw new Error('not ok')
      })
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [indicator, days])

  if (loading) {
    return (
      <div className="rounded-xl border border-neutral-200/80 bg-white p-4 dark:border-neutral-800/80 dark:bg-neutral-900">
        <div className="skeleton mb-2 h-4 w-16 rounded" />
        <div className="skeleton h-6 w-24 rounded" />
      </div>
    )
  }

  if (!data || data.series.length === 0) return null

  // Series is newest-first from the API, reverse for chronological order
  const series = [...data.series].reverse()
  const current = data.series[0]?.value
  const previous = data.series[1]?.value
  const delta = previous ? ((current - previous) / previous) * 100 : 0
  const isPositive = delta >= 0

  const chartColor = isPositive ? '#10b981' : '#ef4444'

  return (
    <div className="rounded-xl border border-neutral-200/80 bg-white p-4 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900">
      <div className="mb-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
        {label}
      </div>
      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-lg font-bold tabular-nums text-neutral-900 dark:text-neutral-100">
          {unit}{current?.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        </span>
        <span className={`text-xs font-semibold tabular-nums ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(delta).toFixed(2)}%
        </span>
      </div>
      <SparklineChart data={series} color={chartColor} />
    </div>
  )
}
