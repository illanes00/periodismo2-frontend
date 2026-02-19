import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acerca de',
}

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-serif text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
        Acerca de Periodismo2
      </h1>

      <div className="space-y-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
        <p>
          <strong className="text-neutral-900 dark:text-neutral-200">Periodismo2</strong> es un agregador de noticias
          que recopila artículos de más de 100 fuentes chilenas e internacionales en tiempo real.
        </p>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-3 font-serif text-xl font-bold text-neutral-900 dark:text-white">
            Cómo funciona
          </h2>
          <p>
            Nuestro sistema revisa automáticamente los feeds RSS de los principales medios
            cada 5 minutos. Los artículos son procesados, deduplicados y clasificados
            antes de ser publicados en el sitio.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-3 font-serif text-xl font-bold text-neutral-900 dark:text-white">
            Fuentes
          </h2>
          <p className="mb-3">
            Incluimos medios de alcance nacional e internacional:
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            {['Cooperativa', 'La Tercera', 'BBC Mundo', 'Reuters', 'CNN', 'El País', 'The Guardian', 'Le Monde', 'Infobae', 'Clarín', 'ProPublica', 'France24'].map((s) => (
              <span key={s} className="rounded-full bg-neutral-100 px-3 py-1 font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                {s}
              </span>
            ))}
            <span className="rounded-full bg-red-50 px-3 py-1 font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400">
              +90 más
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-3 font-serif text-xl font-bold text-neutral-900 dark:text-white">
            Tecnología
          </h2>
          <p>
            Construido con Python (FastAPI + Celery) para el backend y Next.js + TypeScript
            para el frontend. Los datos se almacenan en PostgreSQL y la cola de mensajes
            usa Redis.
          </p>
        </div>

        <p className="text-sm text-neutral-500">
          Para consultas o sugerencias:{' '}
          <a href="mailto:contacto@periodismo2.cl" className="text-red-600 hover:underline dark:text-red-400">
            contacto@periodismo2.cl
          </a>
        </p>
      </div>
    </article>
  )
}
