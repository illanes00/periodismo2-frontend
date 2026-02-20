'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) {
      setShow(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', '1')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-neutral-200/80 bg-white/95 p-4 backdrop-blur-lg dark:border-neutral-800/80 dark:bg-neutral-950/95">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 sm:text-left">
          Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra{' '}
          <Link href="/about#privacidad" className="font-medium text-brand-600 underline hover:text-brand-700 dark:text-brand-500">
            política de privacidad
          </Link>.
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-lg bg-brand-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
        >
          Aceptar
        </button>
      </div>
    </div>
  )
}
