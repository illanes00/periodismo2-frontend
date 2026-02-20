import Image from 'next/image'
import Link from 'next/link'
import type { NewsItem } from '@/lib/types'
import { CATEGORIES, getCategoryColors } from '@/lib/categories'
import { JournalistAvatar } from './JournalistAvatar'
import { CategoryFallback } from './CategoryFallback'
import { timeAgo, readingTime, countryFlag } from '@/lib/utils'

export function FeaturedCard({ item }: { item: NewsItem }) {
  const colors = getCategoryColors(item.category)
  const catName = item.category ? CATEGORIES[item.category]?.name || item.category : null

  return (
    <Link
      href={`/article/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-neutral-800/80 dark:bg-neutral-900 dark:focus-visible:ring-offset-neutral-950"
    >
      {/* Image — with category fallback gradient when no image */}
      <div className="relative h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {item.img ? (
          <>
            <Image
              src={item.img}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </>
        ) : (
          <CategoryFallback category={item.category || ''} size="lg" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {catName && (
          <span className={`mb-2 inline-flex w-fit rounded px-2 py-0.5 text-xs font-semibold ${colors.badge}`}>
            {countryFlag(item.country) ? `${countryFlag(item.country)} ` : ''}{catName}
          </span>
        )}
        <h2 className="mb-1.5 line-clamp-2 font-serif text-lg font-bold leading-snug text-neutral-900 transition group-hover:text-brand-700 group-hover:underline group-hover:decoration-brand-600/50 group-hover:underline-offset-2 dark:text-neutral-100 dark:group-hover:text-brand-500">
          {item.title}
        </h2>
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {item.summary}
        </p>
        <div className="mt-auto flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
          {item.journalist_name && (
            <span className="inline-flex items-center gap-1">
              <JournalistAvatar config={null} photoUrl={item.journalist_photo_url} size="sm" />
              {item.journalist_name}
            </span>
          )}
          {item.published_ts && (
            <time className="text-neutral-400 dark:text-neutral-600">{timeAgo(item.published_ts)}</time>
          )}
          <span className="text-neutral-400 dark:text-neutral-600">{readingTime(item.summary)}</span>
        </div>
      </div>
    </Link>
  )
}
