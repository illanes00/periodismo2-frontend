'use client'

import { useEffect, useState } from 'react'

interface Props {
  title: string
}

export function FloatingShareBar({ title }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show the bar when the article header scrolls out of view
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    // Observe the article header element
    const header = document.querySelector('article header')
    if (header) observer.observe(header)
    return () => observer.disconnect()
  }, [])

  function getShareUrl(): string {
    return typeof window !== 'undefined' ? window.location.href : ''
  }

  function shareTwitter() {
    const text = encodeURIComponent(title)
    const link = encodeURIComponent(getShareUrl())
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${link}`,
      '_blank',
      'noopener,noreferrer,width=550,height=420',
    )
  }

  function shareWhatsApp() {
    const text = encodeURIComponent(`${title} ${getShareUrl()}`)
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  function shareFacebook() {
    const link = encodeURIComponent(getShareUrl())
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${link}`,
      '_blank',
      'noopener,noreferrer,width=550,height=420',
    )
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getShareUrl())
    } catch {
      // silently fail
    }
  }

  if (!visible) return null

  const btnClass =
    'flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-500 shadow-md transition hover:text-neutral-700 hover:shadow-lg dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'

  return (
    <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
      <button onClick={shareTwitter} aria-label="Compartir en X" className={btnClass}>
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      <button onClick={shareWhatsApp} aria-label="Compartir en WhatsApp" className={btnClass}>
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </button>
      <button onClick={shareFacebook} aria-label="Compartir en Facebook" className={btnClass}>
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
      <button onClick={copyLink} aria-label="Copiar enlace" className={btnClass}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-2.882a4.5 4.5 0 0 0-1.242-7.244l-4.5-4.5a4.5 4.5 0 0 0-6.364 6.364L4.25 8.016" />
        </svg>
      </button>
    </div>
  )
}
