import { Suspense } from 'react'
import { PreferencesContent } from './PreferencesContent'

export default function NewsletterPreferences() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><p className="text-neutral-500">Cargando...</p></div>}>
      <PreferencesContent />
    </Suspense>
  )
}
