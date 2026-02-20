import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal',
}

export default function LegalPage() {
  return (
    <article className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert">
      <h1>Aviso Legal</h1>

      <h2>Identificación</h2>
      <p>
        Periodismo2 es un medio digital independiente que opera desde Chile, dedicado a la
        recopilación, curación y difusión de noticias de interés público.
      </p>

      <h2>Propiedad Intelectual</h2>
      <p>
        Los contenidos originales publicados en Periodismo2, incluyendo textos, diseño gráfico
        y código fuente, son propiedad de sus autores y están protegidos por la legislación
        chilena de propiedad intelectual (Ley N° 17.336).
      </p>
      <p>
        Las noticias curadas y reescritas se basan en información de dominio público proveniente
        de fuentes abiertas. Se cita la fuente original cuando corresponde.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        Periodismo2 no se responsabiliza por la exactitud, integridad o actualidad de la
        información proporcionada por fuentes externas. El contenido se ofrece con fines
        informativos y no constituye asesoramiento profesional de ningún tipo.
      </p>

      <h2>Enlaces Externos</h2>
      <p>
        Este sitio puede contener enlaces a sitios web de terceros. Periodismo2 no tiene
        control sobre el contenido de estos sitios y no asume responsabilidad por ellos.
      </p>

      <h2>Contacto</h2>
      <p>
        Para consultas legales, puedes escribirnos a{' '}
        <a href="mailto:contacto@periodismo2.cl">contacto@periodismo2.cl</a>.
      </p>
    </article>
  )
}
