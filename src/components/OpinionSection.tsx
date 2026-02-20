import { getLatestNews } from '@/lib/api'
import { OpinionCard } from './OpinionCard'
import Link from 'next/link'

export async function OpinionSection() {
  const news = await getLatestNews(4, undefined, undefined, 'opinion')
  if (news.items.length === 0) return null

  return (
    <section className="mb-10">
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Opinión
        </h2>
        <div className="h-px flex-1 bg-indigo-200 dark:bg-indigo-900/50" />
        <Link
          href="/category/opinion"
          className="text-xs font-medium text-indigo-600 transition hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Ver todas →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {news.items.map((item) => (
          <OpinionCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
