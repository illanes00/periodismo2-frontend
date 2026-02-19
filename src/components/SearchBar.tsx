'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q.length >= 2) {
      router.push(`/search?q=${encodeURIComponent(q)}`)
      setQuery('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative hidden sm:block">
      <svg
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      <input
        type="search"
        placeholder="Buscar noticias..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-44 rounded-lg border bg-neutral-100/80 py-1.5 pl-9 pr-3 text-sm outline-none transition-all duration-200 placeholder:text-neutral-400 dark:bg-neutral-800/80 dark:text-neutral-200 dark:placeholder:text-neutral-500 ${
          focused
            ? 'w-64 border-brand-500 ring-2 ring-brand-500/20'
            : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600'
        }`}
      />
    </form>
  )
}
