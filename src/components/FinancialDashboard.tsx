'use client'

import { useState } from 'react'
import { FinancialWidget } from './FinancialWidget'

const INDICATORS = [
  { key: 'uf', label: 'UF', unit: '$' },
  { key: 'dolar', label: 'Dólar', unit: '$' },
  { key: 'euro', label: 'Euro', unit: '$' },
  { key: 'utm', label: 'UTM', unit: '$' },
  { key: 'ipc', label: 'IPC', unit: '' },
  { key: 'cobre', label: 'Cobre', unit: 'US$' },
]

const RANGES = [
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
] as const

export function FinancialDashboard() {
  const [range, setRange] = useState<number>(30)

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Indicadores Financieros
          </h2>
          <div className="h-px flex-1 bg-emerald-200 dark:bg-emerald-900/50" />
        </div>
        <div className="flex gap-1 rounded-lg border border-neutral-200 p-0.5 dark:border-neutral-700">
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setRange(r.days)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                range === r.days
                  ? 'bg-emerald-600 text-white'
                  : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {INDICATORS.map((ind) => (
          <FinancialWidget
            key={`${ind.key}-${range}`}
            indicator={ind.key}
            label={ind.label}
            unit={ind.unit}
            days={range}
          />
        ))}
      </div>
    </div>
  )
}
