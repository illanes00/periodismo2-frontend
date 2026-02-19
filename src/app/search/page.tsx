import { searchNews } from '@/lib/api'
import { NewsCard } from '@/components/NewsCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; before?: string }>
}) {
  const params = await searchParams
  const q = params.q || ''

  if (q.length < 2) {
    return (
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Buscar noticias</h1>
        <p className="text-neutral-500">Ingresa al menos 2 caracteres para buscar.</p>
      </div>
    )
  }

  const news = await searchNews(q, 20, params.before)

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">
        Resultados para &ldquo;{q}&rdquo;
      </h1>

      {news.items.length === 0 ? (
        <p className="text-neutral-500">No se encontraron noticias.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {news.items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {news.next_cursor && (
        <div className="mt-8 text-center">
          <a
            href={`/search?q=${encodeURIComponent(q)}&before=${encodeURIComponent(news.next_cursor)}`}
            className="inline-block rounded-md bg-red-700 px-6 py-2 text-sm font-medium text-white hover:bg-red-800"
          >
            Más resultados
          </a>
        </div>
      )}
    </>
  )
}
