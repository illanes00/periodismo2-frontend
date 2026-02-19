'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q.length >= 2) {
      router.push(`/search?q=${encodeURIComponent(q)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="hidden sm:block">
      <input
        type="search"
        placeholder="Buscar noticias..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-48 rounded-md border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-sm focus:border-red-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
      />
    </form>
  )
}
