import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acerca de',
}

export default function AboutPage() {
  return (
    <article className="prose prose-neutral mx-auto max-w-2xl dark:prose-invert">
      <h1>Acerca de Periodismo2</h1>
      <p>
        Periodismo2 es un agregador de noticias que recopila artículos de más de 100 fuentes
        chilenas e internacionales en tiempo real.
      </p>
      <h2>Cómo funciona</h2>
      <p>
        Nuestro sistema revisa automáticamente los feeds RSS de los principales medios
        cada 5 minutos. Los artículos son procesados, deduplicados y clasificados
        antes de ser publicados en el sitio.
      </p>
      <h2>Fuentes</h2>
      <p>
        Incluimos medios como Cooperativa, La Tercera, BBC Mundo, Reuters, CNN en Español,
        El País, The Guardian, Le Monde y muchos más.
      </p>
      <h2>Contacto</h2>
      <p>
        Para consultas o sugerencias, puedes escribir a{' '}
        <a href="mailto:contacto@periodismo2.cl">contacto@periodismo2.cl</a>.
      </p>
    </article>
  )
}
