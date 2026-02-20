'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.periodismo2.cl'

interface Prefs {
  email: string
  name: string
  digest_manana: boolean
  digest_mediodia: boolean
  digest_tarde: boolean
  digest_noche: boolean
  breaking_alerts: boolean
  categories: string[]
  is_active: boolean
}

export function PreferencesContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''

  const [prefs, setPrefs] = useState<Prefs | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [unsubscribed, setUnsubscribed] = useState(false)

  useEffect(() => {
    if (!token) {
      setError('Token no proporcionado')
      setLoading(false)
      return
    }
    fetch(`${API_BASE}/api/newsletter/preferences?token=${token}`)
      .then((res) => {
        if (!res.ok) throw new Error('No encontrado')
        return res.json()
      })
      .then((data) => {
        setPrefs(data)
        setLoading(false)
      })
      .catch(() => {
        setError('No se pudo cargar tus preferencias. Verifica el enlace.')
        setLoading(false)
      })
  }, [token])

  const handleSave = async () => {
    if (!prefs) return
    setSaving(true)
    setSaved(false)
    try {
      const form = new FormData()
      form.append('digest_manana', String(prefs.digest_manana))
      form.append('digest_mediodia', String(prefs.digest_mediodia))
      form.append('digest_tarde', String(prefs.digest_tarde))
      form.append('digest_noche', String(prefs.digest_noche))
      form.append('breaking_alerts', String(prefs.breaking_alerts))
      form.append('categories', prefs.categories.join(','))

      const res = await fetch(`${API_BASE}/api/newsletter/preferences?token=${token}`, {
        method: 'PUT',
        body: form,
      })
      if (!res.ok) throw new Error('Error')
      setSaved(true)
    } catch {
      setError('Error al guardar preferencias')
    } finally {
      setSaving(false)
    }
  }

  const handleUnsubscribe = async () => {
    if (!confirm('Estas seguro de que quieres desuscribirte?')) return
    try {
      await fetch(`${API_BASE}/api/newsletter/unsubscribe?token=${token}`)
      setUnsubscribed(true)
    } catch {
      setError('Error al desuscribirte')
    }
  }

  if (unsubscribed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <h1 className="mb-3 text-xl font-bold text-neutral-900 dark:text-white">
            Te has desuscrito
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Ya no recibiras correos de Periodismo2. Si cambias de opinion, puedes volver a suscribirte.
          </p>
          <a href="/" className="mt-4 inline-block text-sm font-medium text-brand-600 underline dark:text-brand-400">
            Volver a Periodismo2
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
      <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="mb-1 text-xl font-bold text-neutral-900 dark:text-white">
          Preferencias de Newsletter
        </h1>
        <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
          Personaliza cuando y que noticias recibes.
        </p>

        {loading && <p className="text-sm text-neutral-500">Cargando...</p>}

        {error && !prefs && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {prefs && (
          <div className="space-y-6">
            <div>
              <p className="mb-1 text-xs text-neutral-500 dark:text-neutral-400">Suscrito como</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">{prefs.email}</p>
            </div>

            <div>
              <h2 className="mb-3 text-sm font-semibold text-neutral-900 dark:text-white">
                Horarios de digest
              </h2>
              <div className="space-y-2">
                {([
                  ['digest_manana', '07:00 — Manana'] as const,
                  ['digest_mediodia', '12:00 — Mediodia'] as const,
                  ['digest_tarde', '17:00 — Tarde'] as const,
                  ['digest_noche', '22:00 — Noche'] as const,
                ]).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                    <input
                      type="checkbox"
                      checked={prefs[key]}
                      onChange={(e) => setPrefs({ ...prefs, [key]: e.target.checked })}
                      className="rounded border-neutral-300"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-sm font-semibold text-neutral-900 dark:text-white">
                Alertas
              </h2>
              <label className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                <input
                  type="checkbox"
                  checked={prefs.breaking_alerts}
                  onChange={(e) => setPrefs({ ...prefs, breaking_alerts: e.target.checked })}
                  className="rounded border-neutral-300"
                />
                Recibir alertas de ultimo minuto
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700 disabled:opacity-50"
              >
                {saving ? 'Guardando...' : 'Guardar preferencias'}
              </button>
            </div>

            {saved && (
              <p className="text-center text-sm font-medium text-green-600 dark:text-green-400">
                Preferencias guardadas correctamente
              </p>
            )}
            {error && prefs && (
              <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <hr className="border-neutral-200 dark:border-neutral-700" />

            <button
              onClick={handleUnsubscribe}
              className="w-full text-center text-xs text-neutral-500 underline hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400"
            >
              Desuscribirse de todos los correos
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
