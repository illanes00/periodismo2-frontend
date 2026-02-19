'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { SourceCount } from '@/lib/types'

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

export function SourceFilter({ sources }: { sources: SourceCount[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get('source') || ''

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value
    router.push(val ? `/?source=${encodeURIComponent(val)}` : '/')
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
    >
      <option value="">Todas las fuentes</option>
      {sources.map((s) => (
        <option key={s.source} value={s.source}>
          {extractDomain(s.source)} ({s.count})
        </option>
      ))}
    </select>
  )
}
