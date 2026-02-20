import Image from 'next/image'
import Link from 'next/link'
import type { NewsItem } from '@/lib/types'
import { CATEGORIES } from '@/lib/categories'
import { timeAgo, countryFlag } from '@/lib/utils'

export function HeroArticle({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/article/${item.id}`}
      className="group relative block overflow-hidden rounded-2xl bg-neutral-900 shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950"
    >
      {item.img ? (
        <div className="relative aspect-[4/3] sm:aspect-[21/9] md:aspect-[2/1]">
          <Image
            src={item.img}
            alt={item.title}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-gradient-to-br from-brand-800 to-neutral-900 sm:aspect-[21/9] md:aspect-[2/1]" />
      )}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="mb-2 flex items-center gap-3 sm:mb-3">
          <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-semibold text-white sm:px-3 sm:py-1">
            Destacado
          </span>
          {item.category && (
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white/90 backdrop-blur-sm sm:px-3 sm:py-1">
              {countryFlag(item.country) ? `${countryFlag(item.country)} ` : ''}{CATEGORIES[item.category]?.name || item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </span>
          )}
          {item.published_ts && (
            <time className="text-xs text-white/70">{timeAgo(item.published_ts)}</time>
          )}
        </div>
        <h1 className="mb-1 max-w-3xl font-serif text-xl font-bold leading-tight text-white group-hover:underline group-hover:decoration-white/50 group-hover:underline-offset-2 sm:mb-2 sm:text-2xl md:text-3xl lg:text-4xl">
          {item.title}
        </h1>
        <p className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
          {item.summary}
        </p>
      </div>
    </Link>
  )
}
