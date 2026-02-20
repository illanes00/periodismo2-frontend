'use client'

import { useEffect, useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className="fixed bottom-20 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200/50 bg-white/80 text-neutral-700 shadow-lg backdrop-blur-md transition hover:bg-white hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 md:bottom-6 dark:border-neutral-700/50 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-brand-400 dark:focus-visible:ring-offset-neutral-950"
    >
      {/* Light mode icon */}
      <svg className="h-5 w-5 dark:hidden" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </svg>
      {/* Dark mode icon */}
      <svg className="hidden h-5 w-5 dark:block" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </svg>
    </button>
  )
}
