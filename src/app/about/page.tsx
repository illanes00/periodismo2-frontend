import Link from 'next/link'
import type { Metadata } from 'next'
import { getJournalists } from '@/lib/api'
import { JournalistAvatar } from '@/components/JournalistAvatar'

export const metadata: Metadata = {
  title: 'Acerca de — Periodismo2',
  description: 'Periodismo2 es un medio digital independiente dedicado a informar con precision, profundidad y diversidad.',
}

export default async function AboutPage() {
  const journalists = await getJournalists()
  const writers = journalists.filter((j) => j.role === 'writer')

  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
        Acerca de Periodismo2
      </h1>
      <p className="mb-8 text-lg text-neutral-500 dark:text-neutral-400">
        Medio digital independiente
      </p>

      <div className="space-y-8 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
        {/* Mision */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-3 font-serif text-xl font-bold text-neutral-900 dark:text-white">
            Mision
          </h2>
          <p>
            <strong className="text-neutral-900 dark:text-neutral-200">Periodismo2</strong> es un medio digital
            independiente dedicado a informar con precision, profundidad y diversidad. Nuestro compromiso es ofrecer
            periodismo de calidad que conecte a los lectores chilenos con las noticias que importan.
          </p>
        </div>

        {/* Vision */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-3 font-serif text-xl font-bold text-neutral-900 dark:text-white">
            Vision
          </h2>
          <p>
            Ser referente en periodismo digital de calidad en Chile y Latinoamerica, conectando a las
            audiencias con informacion verificada y contextualizada.
          </p>
        </div>

        {/* Valores */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-4 font-serif text-xl font-bold text-neutral-900 dark:text-white">
            Valores
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800/50">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30">
                <svg className="h-5 w-5 text-brand-700 dark:text-brand-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-200">Precision</h3>
              <p className="text-sm">Verificamos cada hecho y contrastamos multiples fuentes antes de publicar.</p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800/50">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30">
                <svg className="h-5 w-5 text-brand-700 dark:text-brand-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" />
                </svg>
              </div>
              <h3 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-200">Independencia</h3>
              <p className="text-sm">Operamos sin compromisos editoriales con grupos politicos o economicos.</p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800/50">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30">
                <svg className="h-5 w-5 text-brand-700 dark:text-brand-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-200">Transparencia</h3>
              <p className="text-sm">Citamos nuestras fuentes y corregimos errores de forma abierta.</p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800/50">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30">
                <svg className="h-5 w-5 text-brand-700 dark:text-brand-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <h3 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-200">Diversidad</h3>
              <p className="text-sm">Cubrimos multiples perspectivas y temas para reflejar la realidad completa.</p>
            </div>
          </div>
        </div>

        {/* Equipo */}
        {writers.length > 0 && (
          <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-4 font-serif text-xl font-bold text-neutral-900 dark:text-white">
              Equipo de redaccion
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {writers.map((j) => (
                <Link
                  key={j.slug}
                  href={`/journalist/${j.slug}`}
                  className="flex items-start gap-3 rounded-lg border border-transparent p-3 transition hover:border-neutral-200 hover:bg-neutral-50 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
                >
                  <JournalistAvatar config={j.avatar_config} photoUrl={j.photo_url} size="lg" />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-200">{j.name}</h3>
                    <p className="line-clamp-2 text-xs text-neutral-500">{j.bio}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {j.specialties.map((s) => (
                        <span key={s} className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Fuentes */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-3 font-serif text-xl font-bold text-neutral-900 dark:text-white">
            Fuentes
          </h2>
          <p className="mb-3 text-sm">
            Recopilamos noticias de medios de alcance nacional e internacional:
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            {['Cooperativa', 'La Tercera', 'BioBio', 'Publimetro', 'El Mostrador', 'BBC', 'Reuters', 'CNN', 'The Guardian', 'El Pais', 'Le Monde', 'Infobae', 'Clarin', 'France24', 'Washington Post'].map((s) => (
              <span key={s} className="rounded-full bg-neutral-100 px-3 py-1 font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                {s}
              </span>
            ))}
            <span className="rounded-full bg-red-50 px-3 py-1 font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400">
              +90 mas
            </span>
          </div>
        </div>

        {/* Contacto */}
        <p className="text-sm text-neutral-500">
          Para consultas o sugerencias:{' '}
          <a href="mailto:contacto@periodismo2.cl" className="text-brand-600 hover:underline dark:text-brand-400">
            contacto@periodismo2.cl
          </a>
        </p>
      </div>
    </article>
  )
}
