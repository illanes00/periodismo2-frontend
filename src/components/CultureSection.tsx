import Link from 'next/link'
import { getLatestNews } from '@/lib/api'
import { NewsCard } from './NewsCard'
import { AdaptiveGrid } from './AdaptiveGrid'

export async function CultureSection() {
  const news = await getLatestNews(8, undefined, 'CL', 'cultura')
  const articles = news.items

  if (articles.length === 0) return null

  return (
    <section className="mb-10">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
          </svg>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            Cultura en Chile
          </h2>
        </div>
        <Link
          href="/?category=cultura&country=CL"
          className="text-sm font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-500 dark:hover:text-brand-400"
        >
          Ver mas &rarr;
        </Link>
      </div>
      <AdaptiveGrid minItemWidth={220} className="gap-5">
        {articles.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </AdaptiveGrid>
    </section>
  )
}
