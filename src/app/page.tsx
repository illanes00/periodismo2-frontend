import { Suspense } from 'react'
import { getLatestNews, getSources } from '@/lib/api'
import { HeroArticle } from '@/components/HeroArticle'
import { NewsCard } from '@/components/NewsCard'
import { SourceFilter } from '@/components/SourceFilter'

export const revalidate = 300

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; before?: string }>
}) {
  const params = await searchParams
  const [news, sources] = await Promise.all([
    getLatestNews(21, params.before, params.source),
    getSources(),
  ])

  const items = news.items
  const hero = items[0]
  const rest = items.slice(1)

  return (
    <>
      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Noticias
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Últimas noticias de más de 100 fuentes
          </p>
        </div>
        <Suspense>
          <SourceFilter sources={sources} />
        </Suspense>
      </div>

      {/* Hero */}
      {hero && !params.before && (
        <div className="mb-8">
          <HeroArticle item={hero} />
        </div>
      )}

      {/* Section divider */}
      {!params.before && rest.length > 0 && (
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Más noticias
          </h2>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(params.before ? items : rest).map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            No hay noticias disponibles.
          </p>
        </div>
      )}

      {/* Load more */}
      {news.next_cursor && (
        <div className="mt-10 text-center">
          <a
            href={`/?before=${encodeURIComponent(news.next_cursor)}${params.source ? `&source=${encodeURIComponent(params.source)}` : ''}`}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-neutral-400 hover:shadow dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600"
          >
            Cargar más noticias
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </a>
        </div>
      )}
    </>
  )
}
