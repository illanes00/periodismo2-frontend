import Image from 'next/image'
import Link from 'next/link'
import type { NewsItem } from '@/lib/types'
import { CATEGORIES, getCategoryColors } from '@/lib/categories'
import { JournalistByline } from './JournalistByline'
import { timeAgo, countryFlag } from '@/lib/utils'

export function HorizontalCard({ item }: { item: NewsItem }) {
  const catName = item.category ? CATEGORIES[item.category]?.name || item.category : null
  const colors = getCategoryColors(item.category)

  return (
    <Link
      href={`/article/${item.id}`}
      className="group flex gap-3 rounded-lg p-2 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:hover:bg-neutral-800/60 dark:focus-visible:ring-offset-neutral-950"
    >
      {/* Thumbnail — only if image exists */}
      {item.img ? (
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={item.img}
            alt={item.title}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="w-1 flex-shrink-0 self-stretch rounded-full bg-gradient-to-b from-brand-500 to-brand-400" />
      )}

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="mb-1 flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400 dark:text-neutral-500">
          {catName && (
            <span className={`rounded px-1 py-0.5 text-[10px] font-semibold ${colors.badge}`}>
              {countryFlag(item.country) ? `${countryFlag(item.country)} ` : ''}{catName}
            </span>
          )}
          {item.journalist_name && (
            <JournalistByline
              name={item.journalist_name}
              slug={item.journalist_slug}
              photoUrl={item.journalist_photo_url}
              size="sm"
            />
          )}
          {item.published_ts && <time>{timeAgo(item.published_ts)}</time>}
        </div>
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-neutral-900 transition group-hover:text-brand-700 group-hover:underline group-hover:decoration-brand-600/50 group-hover:underline-offset-2 dark:text-neutral-100 dark:group-hover:text-brand-500">
          {item.title}
        </h3>
      </div>
    </Link>
  )
}
