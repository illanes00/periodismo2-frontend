import Link from 'next/link'
import type { NewsItem } from '@/lib/types'
import { CATEGORIES, getCategoryColors } from '@/lib/categories'
import { timeAgo, readingTime, countryFlag } from '@/lib/utils'

export function HeadlineCard({ item }: { item: NewsItem }) {
  const colors = getCategoryColors(item.category)
  const catName = item.category ? CATEGORIES[item.category]?.name || item.category : null

  return (
    <Link
      href={`/article/${item.id}`}
      className={`group block rounded-lg border-l-4 ${colors.border} bg-white px-4 py-3 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:bg-neutral-900 dark:hover:bg-neutral-800/80 dark:focus-visible:ring-offset-neutral-950`}
    >
      {catName && (
        <span className={`mb-1.5 inline-flex rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${colors.badge}`}>
          {countryFlag(item.country) ? `${countryFlag(item.country)} ` : ''}{catName}
        </span>
      )}
      <h2 className="mb-2 line-clamp-2 font-serif text-base font-bold leading-snug text-neutral-900 transition group-hover:text-brand-700 group-hover:underline group-hover:decoration-brand-600/50 group-hover:underline-offset-2 dark:text-neutral-100 dark:group-hover:text-brand-500">
        {item.title}
      </h2>
      <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
        {item.journalist_name && (
          <span className="text-neutral-500 dark:text-neutral-400">{item.journalist_name}</span>
        )}
        {item.journalist_name && item.published_ts && <span>&middot;</span>}
        {item.published_ts && <time>{timeAgo(item.published_ts)}</time>}
        <span>&middot;</span>
        <span>{readingTime(item.summary)}</span>
      </div>
    </Link>
  )
}
