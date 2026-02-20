import Image from 'next/image'
import Link from 'next/link'
import type { NewsItem } from '@/lib/types'
import { CATEGORIES } from '@/lib/categories'
import { JournalistByline } from './JournalistByline'
import { CategoryFallback } from './CategoryFallback'
import { timeAgo, countryFlag } from '@/lib/utils'

type CardVariant = 'default' | 'compact' | 'horizontal'

export function NewsCard({ item, variant = 'default' }: { item: NewsItem; variant?: CardVariant }) {
  const journalistBadge = item.journalist_name ? (
    <JournalistByline
      name={item.journalist_name}
      slug={item.journalist_slug}
      photoUrl={item.journalist_photo_url}
    />
  ) : null

  if (variant === 'compact') {
    return (
      <Link
        href={`/article/${item.id}`}
        className="group flex flex-col gap-1.5 rounded-lg border border-transparent px-3 py-2.5 transition hover:border-neutral-200 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:hover:border-neutral-800 dark:hover:bg-neutral-900 dark:focus-visible:ring-offset-neutral-950"
      >
        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
          {journalistBadge}
          {item.category && (
            <span className="rounded bg-brand-50 px-1.5 py-0.5 font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
              {countryFlag(item.country) ? `${countryFlag(item.country)} ` : ''}{CATEGORIES[item.category]?.name || item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </span>
          )}
          {item.published_ts && (
            <time className="text-neutral-400 dark:text-neutral-600">{timeAgo(item.published_ts)}</time>
          )}
        </div>
        <h2 className="line-clamp-2 text-sm font-bold leading-snug text-neutral-900 transition group-hover:text-brand-700 group-hover:underline group-hover:decoration-brand-600/50 group-hover:underline-offset-2 dark:text-neutral-100 dark:group-hover:text-brand-500">
          {item.title}
        </h2>
      </Link>
    )
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/article/${item.id}`}
        className="group flex gap-4 overflow-hidden rounded-xl border border-neutral-200/80 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-neutral-800/80 dark:bg-neutral-900 dark:focus-visible:ring-offset-neutral-950"
      >
        {/* Thumbnail — only if image exists */}
        {item.img && (
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:h-28 sm:w-28 dark:bg-neutral-800">
            <Image
              src={item.img}
              alt={item.title}
              fill
              sizes="112px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="mb-1.5 flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
            {journalistBadge}
            {item.category && (
              <span className="rounded bg-brand-50 px-1.5 py-0.5 font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                {countryFlag(item.country) ? `${countryFlag(item.country)} ` : ''}{CATEGORIES[item.category]?.name || item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </span>
            )}
            {item.published_ts && (
              <time className="text-neutral-400 dark:text-neutral-600">{timeAgo(item.published_ts)}</time>
            )}
          </div>
          <h2 className="mb-1 line-clamp-2 font-serif text-sm font-bold leading-snug text-neutral-900 transition group-hover:text-brand-700 group-hover:underline group-hover:decoration-brand-600/50 group-hover:underline-offset-2 sm:text-base dark:text-neutral-100 dark:group-hover:text-brand-500">
            {item.title}
          </h2>
          <p className="line-clamp-2 hidden text-xs leading-relaxed text-neutral-500 sm:block dark:text-neutral-400">
            {item.summary}
          </p>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/article/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-neutral-800/80 dark:bg-neutral-900 dark:focus-visible:ring-offset-neutral-950"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {item.img ? (
          <>
            <Image
              src={item.img}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
          </>
        ) : (
          <CategoryFallback category={item.category || ''} size="lg" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
          {journalistBadge}
          {item.category && (
            <span className="rounded bg-brand-50 px-1.5 py-0.5 font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
              {countryFlag(item.country) ? `${countryFlag(item.country)} ` : ''}{CATEGORIES[item.category]?.name || item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </span>
          )}
          {item.published_ts && (
            <time className="text-neutral-400 dark:text-neutral-600">{timeAgo(item.published_ts)}</time>
          )}
        </div>
        <h2 className="mb-2 line-clamp-2 font-serif text-base font-bold leading-snug text-neutral-900 transition group-hover:text-brand-700 group-hover:underline group-hover:decoration-brand-600/50 group-hover:underline-offset-2 dark:text-neutral-100 dark:group-hover:text-brand-500">
          {item.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {item.summary}
        </p>
      </div>
    </Link>
  )
}
