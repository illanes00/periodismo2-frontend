'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (mobileOpen && mobileInputRef.current) {
      mobileInputRef.current.focus()
    }
  }, [mobileOpen])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q.length >= 2) {
      router.push(`/search?q=${encodeURIComponent(q)}`)
      setQuery('')
      setMobileOpen(false)
    }
  }

  return (
    <>
      {/* Desktop search bar */}
      <form onSubmit={handleSubmit} className="relative hidden sm:block">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
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

      {/* Mobile search icon */}
      <button
        onClick={() => setMobileOpen(true)}
        className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 sm:hidden dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
        aria-label="Buscar"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>

      {/* Mobile full-width search overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[80] sm:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative border-b border-neutral-200 bg-white px-4 py-3 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <svg className="h-5 w-5 shrink-0 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                ref={mobileInputRef}
                type="search"
                placeholder="Buscar noticias..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-base text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
              <button
                type="button"
                onClick={() => { setMobileOpen(false); setQuery('') }}
                className="shrink-0 rounded-md px-2 py-1 text-sm font-medium text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
