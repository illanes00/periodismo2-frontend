import { Suspense } from 'react'
import { getLatestNews, getSources } from '@/lib/api'
import { HeroArticle } from '@/components/HeroArticle'
import { NewsCard } from '@/components/NewsCard'
import { SourceFilter } from '@/components/SourceFilter'

export const revalidate = 300

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>
}) {
  const params = await searchParams
  const [news, sources] = await Promise.all([
    getLatestNews(21, undefined, params.source),
    getSources(),
  ])

  const items = news.items
  const hero = items[0]
  const rest = items.slice(1)

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Noticias</h1>
        <Suspense>
          <SourceFilter sources={sources} />
        </Suspense>
      </div>

      {hero && (
        <div className="mb-6">
          <HeroArticle item={hero} />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>

      {news.next_cursor && (
        <div className="mt-8 text-center">
          <a
            href={`/?before=${encodeURIComponent(news.next_cursor)}${params.source ? `&source=${encodeURIComponent(params.source)}` : ''}`}
            className="inline-block rounded-md bg-red-700 px-6 py-2 text-sm font-medium text-white hover:bg-red-800"
          >
            Cargar más
          </a>
        </div>
      )}
    </>
  )
}
