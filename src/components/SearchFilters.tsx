'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CATEGORIES } from '@/lib/categories'

const CATEGORY_OPTIONS = Object.entries(CATEGORIES).map(([slug, cat]) => ({
  slug,
  name: cat.name,
}))

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  const currentCategory = searchParams.get('category') || ''
  const currentJournalist = searchParams.get('journalist') || ''
  const currentDateFrom = searchParams.get('date_from') || ''
  const currentDateTo = searchParams.get('date_to') || ''
  const hasActiveFilters = currentCategory || currentJournalist || currentDateFrom || currentDateTo

  function applyFilters(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString())
    // Remove 'before' when filters change to reset pagination
    params.delete('before')
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    }
    router.push(`/search?${params.toString()}`)
  }

  function clearFilters() {
    const params = new URLSearchParams()
    const q = searchParams.get('q')
    if (q) params.set('q', q)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
        Filtros
        {hasActiveFilters && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
            {[currentCategory, currentJournalist, currentDateFrom, currentDateTo].filter(Boolean).length}
          </span>
        )}
      </button>

      {open && (
        <div className="mt-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Category */}
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Categoría
              </label>
              <select
                value={currentCategory}
                onChange={(e) => applyFilters({ category: e.target.value })}
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              >
                <option value="">Todas</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Journalist slug */}
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Periodista
              </label>
              <input
                type="text"
                value={currentJournalist}
                onChange={(e) => applyFilters({ journalist: e.target.value })}
                placeholder="ej: sofia"
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
            </div>

            {/* Date from */}
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Desde
              </label>
              <input
                type="date"
                value={currentDateFrom}
                onChange={(e) => applyFilters({ date_from: e.target.value })}
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
            </div>

            {/* Date to */}
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Hasta
              </label>
              <input
                type="date"
                value={currentDateTo}
                onChange={(e) => applyFilters({ date_to: e.target.value })}
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-3 text-xs font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-400"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {/* Active filter pills */}
      {hasActiveFilters && !open && (
        <div className="mt-2 flex flex-wrap gap-2">
          {currentCategory && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
              {CATEGORIES[currentCategory]?.name || currentCategory}
              <button onClick={() => applyFilters({ category: '' })} className="ml-0.5 hover:text-brand-900">×</button>
            </span>
          )}
          {currentJournalist && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
              {currentJournalist}
              <button onClick={() => applyFilters({ journalist: '' })} className="ml-0.5 hover:text-brand-900">×</button>
            </span>
          )}
          {currentDateFrom && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
              Desde {currentDateFrom}
              <button onClick={() => applyFilters({ date_from: '' })} className="ml-0.5 hover:text-brand-900">×</button>
            </span>
          )}
          {currentDateTo && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
              Hasta {currentDateTo}
              <button onClick={() => applyFilters({ date_to: '' })} className="ml-0.5 hover:text-brand-900">×</button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
