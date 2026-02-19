'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { SourceCount } from '@/lib/types'

export function SourceFilter({ sources }: { sources: SourceCount[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get('source') || ''

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value
    if (val) {
      router.push(`/?source=${encodeURIComponent(val)}`)
    } else {
      router.push('/')
    }
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
    >
      <option value="">Todas las fuentes</option>
      {sources.map((s) => (
        <option key={s.source} value={s.source}>
          {new URL(s.source).hostname.replace('www.', '')} ({s.count})
        </option>
      ))}
    </select>
  )
}
