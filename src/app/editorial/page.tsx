import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estandares Editoriales — Periodismo2',
  description: 'Conoce los principios y procesos editoriales que guian la cobertura de Periodismo2.',
}

export default function EditorialPage() {
  const steps = [
    { num: '1', title: 'Seleccion', desc: 'Identificamos las noticias mas relevantes de multiples fuentes confiables.' },
    { num: '2', title: 'Investigacion', desc: 'Verificamos los hechos y contrastamos la informacion con fuentes adicionales.' },
    { num: '3', title: 'Redaccion', desc: 'Redactamos cada articulo con claridad, contexto y profundidad.' },
    { num: '4', title: 'Revision', desc: 'Cada pieza pasa por revision editorial para asegurar precision y calidad.' },
    { num: '5', title: 'Publicacion', desc: 'Publicamos con atribucion de fuentes y categorizacion adecuada.' },
  ]

  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
        Estandares Editoriales
      </h1>
      <p className="mb-8 text-lg text-neutral-500 dark:text-neutral-400">
        Los principios que guian nuestra cobertura
      </p>

      <div className="space-y-8 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
        {/* Principios */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-4 font-serif text-xl font-bold text-neutral-900 dark:text-white">
            Principios editoriales
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-200">Verificacion</h3>
                <p className="text-sm">Contrastamos informacion de multiples fuentes antes de publicar. Cada dato relevante es verificado de forma independiente.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-200">Pluralidad</h3>
                <p className="text-sm">Presentamos diferentes perspectivas sobre cada tema, buscando representar la diversidad de opiniones y enfoques.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-200">Contexto</h3>
                <p className="text-sm">Conectamos cada noticia con su contexto historico y social, ayudando al lector a comprender el panorama completo.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-200">Correccion</h3>
                <p className="text-sm">Rectificamos errores de forma transparente y oportuna. La credibilidad se construye con responsabilidad.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Proceso editorial */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-4 font-serif text-xl font-bold text-neutral-900 dark:text-white">
            Proceso editorial
          </h2>
          <div className="relative">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-4 pb-6 last:pb-0">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white dark:bg-brand-700">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mt-1 h-full w-0.5 bg-neutral-200 dark:bg-neutral-700" />
                  )}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-200">{step.title}</h3>
                  <p className="text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Politica de correcciones */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-3 font-serif text-xl font-bold text-neutral-900 dark:text-white">
            Politica de correcciones
          </h2>
          <p className="text-sm">
            Si detectamos un error en una publicacion, actualizamos el articulo de forma inmediata
            e incluimos una nota de correccion visible al pie del texto. Valoramos la retroalimentacion
            de nuestros lectores: si encuentras una imprecision, escribenos a{' '}
            <a href="mailto:editor@periodismo2.cl" className="text-brand-600 hover:underline dark:text-brand-400">
              editor@periodismo2.cl
            </a>
            .
          </p>
        </div>

        {/* Contacto */}
        <p className="text-sm text-neutral-500">
          Para consultas editoriales:{' '}
          <a href="mailto:editor@periodismo2.cl" className="text-brand-600 hover:underline dark:text-brand-400">
            editor@periodismo2.cl
          </a>
        </p>
      </div>
    </article>
  )
}
