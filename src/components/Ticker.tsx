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
    { label: 'USD', value: data.dolar?.valor },
    { label: 'EUR', value: data.euro?.valor },
    { label: 'UF', value: data.uf?.valor },
    { label: 'UTM', value: data.utm?.valor },
  ].filter((i) => i.value)

  return (
    <div className="overflow-hidden border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-1.5 text-xs text-neutral-600 dark:text-neutral-400">
        {items.map((item) => (
          <span key={item.label}>
            <strong className="font-semibold text-neutral-800 dark:text-neutral-200">{item.label}</strong>{' '}
            ${item.value?.toLocaleString('es-CL')}
          </span>
        ))}
      </div>
    </div>
  )
}
