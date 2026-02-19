'use client'

import { useEffect, useState } from 'react'
import type { TickerData } from '@/lib/types'

export function Ticker() {
  const [data, setData] = useState<TickerData | null>(null)

  useEffect(() => {
    fetch('https://mindicador.cl/api')
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {})
  }, [])

  if (!data) return null

  const items = [
    { label: 'USD', value: data.dolar?.valor, color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'EUR', value: data.euro?.valor, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'UF', value: data.uf?.valor, color: 'text-amber-600 dark:text-amber-400' },
    { label: 'UTM', value: data.utm?.valor, color: 'text-purple-600 dark:text-purple-400' },
  ].filter((i) => i.value)

  return (
    <div className="border-b border-neutral-200/60 bg-neutral-100/80 dark:border-neutral-800/60 dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-4 py-1.5 text-xs sm:px-6 lg:px-8">
        <span className="shrink-0 font-medium text-neutral-500 dark:text-neutral-500">Indicadores</span>
        <span className="h-3 w-px bg-neutral-300 dark:bg-neutral-700" />
        {items.map((item) => (
          <span key={item.label} className="flex shrink-0 items-center gap-1.5">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">{item.label}</span>
            <span className={item.color}>${item.value?.toLocaleString('es-CL')}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
