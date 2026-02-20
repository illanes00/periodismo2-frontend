'use client'

import { useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.periodismo2.cl'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  const [showPrefs, setShowPrefs] = useState(false)

  // Schedule preferences
  const [manana, setManana] = useState(true)
  const [mediodia, setMediodia] = useState(false)
  const [tarde, setTarde] = useState(false)
  const [noche, setNoche] = useState(false)
  const [breaking, setBreaking] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    setLoading(true)
    try {
      const form = new FormData()
      form.append('email', email)
      form.append('digest_manana', String(manana))
      form.append('digest_mediodia', String(mediodia))
      form.append('digest_tarde', String(tarde))
      form.append('digest_noche', String(noche))
      form.append('breaking_alerts', String(breaking))

      const res = await fetch(`${API_BASE}/api/subscribe`, {
        method: 'POST',
        body: form,
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setToken(data.token || '')
      setSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-brand-200 bg-brand-50 p-4 text-center dark:border-brand-800 dark:bg-brand-950/30">
        <p className="text-sm font-medium text-brand-700 dark:text-brand-300">
          Gracias por suscribirte. Te mantendremos informado.
        </p>
        {token && (
          <a
            href={`/newsletter/preferences?token=${token}`}
            className="mt-2 inline-block text-xs text-brand-600 underline dark:text-brand-400"
          >
            Gestionar preferencias
          </a>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="mb-1 text-sm font-semibold text-neutral-900 dark:text-white">
        Recibe las noticias en tu correo
      </h3>
      <p className="mb-3 text-xs text-neutral-500 dark:text-neutral-400">
        Las noticias mas importantes del dia, directo a tu bandeja.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="email"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-0 flex-1 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 rounded-md bg-brand-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-brand-700 disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Suscribirse'}
          </button>
        </div>

        {/* Expandable preferences */}
        <button
          type="button"
          onClick={() => setShowPrefs(!showPrefs)}
          className="mt-2 text-xs text-neutral-500 underline dark:text-neutral-400"
        >
          {showPrefs ? 'Ocultar opciones' : 'Personalizar horarios'}
        </button>

        {showPrefs && (
          <div className="mt-2 space-y-1.5 rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800/50">
            <p className="mb-1 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Recibir digest a las:
            </p>
            <label className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <input type="checkbox" checked={manana} onChange={(e) => setManana(e.target.checked)} />
              07:00 — Manana
            </label>
            <label className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <input type="checkbox" checked={mediodia} onChange={(e) => setMediodia(e.target.checked)} />
              12:00 — Mediodia
            </label>
            <label className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <input type="checkbox" checked={tarde} onChange={(e) => setTarde(e.target.checked)} />
              17:00 — Tarde
            </label>
            <label className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <input type="checkbox" checked={noche} onChange={(e) => setNoche(e.target.checked)} />
              22:00 — Noche
            </label>
            <hr className="my-1.5 border-neutral-200 dark:border-neutral-700" />
            <label className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <input type="checkbox" checked={breaking} onChange={(e) => setBreaking(e.target.checked)} />
              Recibir alertas de ultimo minuto
            </label>
          </div>
        )}
      </form>
      {error && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          Error al suscribirse. Intenta de nuevo.
        </p>
      )}
    </div>
  )
}
