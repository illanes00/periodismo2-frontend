import Link from 'next/link'
import type { NewsItem } from '@/lib/types'
import { CATEGORIES, getCategoryColors } from '@/lib/categories'
import { NewsCard } from './NewsCard'

export function CategorySection({ category, articles }: { category: string; articles: NewsItem[] }) {
  const cat = CATEGORIES[category]
  if (!cat || articles.length === 0) return null

  const colors = getCategoryColors(category)

  return (
    <section className="mb-10">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={`h-2.5 w-2.5 rounded-full ${colors.dot}`} />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            {cat.name}
          </h2>
        </div>
        <Link
          href={`/category/${category}`}
          className="text-sm font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-500 dark:hover:text-brand-400"
        >
          Ver más &rarr;
        </Link>
      </div>

      {/* Articles grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
