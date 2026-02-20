import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
}

export default function PrivacyPage() {
  return (
    <article className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert">
      <h1>Política de Privacidad</h1>

      <p>Última actualización: febrero 2026.</p>

      <h2>Datos que Recopilamos</h2>
      <p>
        Periodismo2 recopila la mínima información necesaria para operar el servicio:
      </p>
      <ul>
        <li>
          <strong>Suscripción al newsletter:</strong> dirección de correo electrónico,
          proporcionada voluntariamente.
        </li>
        <li>
          <strong>Cookies técnicas:</strong> preferencia de tema (claro/oscuro) almacenada
          localmente en tu navegador.
        </li>
        <li>
          <strong>Datos de navegación:</strong> información estándar de logs del servidor
          (dirección IP, navegador, páginas visitadas) para fines de seguridad y estadísticas
          agregadas.
        </li>
      </ul>

      <h2>Uso de la Información</h2>
      <p>La información recopilada se utiliza exclusivamente para:</p>
      <ul>
        <li>Enviar el newsletter a los suscriptores que lo soliciten.</li>
        <li>Mejorar la experiencia de usuario del sitio.</li>
        <li>Generar estadísticas agregadas de tráfico.</li>
        <li>Proteger la seguridad del servicio.</li>
      </ul>

      <h2>Compartición de Datos</h2>
      <p>
        No vendemos, alquilamos ni compartimos datos personales con terceros, salvo cuando
        sea requerido por ley o autoridad competente.
      </p>

      <h2>Servicios de Terceros</h2>
      <p>
        El sitio utiliza Cloudflare como CDN y protección, que puede procesar datos de
        conexión según su propia política de privacidad.
      </p>

      <h2>Tus Derechos</h2>
      <p>
        De acuerdo con la Ley N° 19.628 sobre Protección de la Vida Privada, puedes
        solicitar acceso, rectificación o eliminación de tus datos personales escribiendo
        a <a href="mailto:contacto@periodismo2.cl">contacto@periodismo2.cl</a>.
      </p>

      <h2>Contacto</h2>
      <p>
        Para consultas sobre privacidad:{' '}
        <a href="mailto:contacto@periodismo2.cl">contacto@periodismo2.cl</a>.
      </p>
    </article>
  )
}
