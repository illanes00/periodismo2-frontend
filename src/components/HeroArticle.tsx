import Image from 'next/image'
import Link from 'next/link'
import type { NewsItem } from '@/lib/types'

function timeAgo(ts: string | null): string {
  if (!ts) return ''
  const diff = Date.now() - new Date(ts).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `hace ${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `hace ${hrs}h`
  const days = Math.floor(hrs / 24)
  return `hace ${days}d`
}

export function HeroArticle({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/article/${item.id}`}
      className="group relative block overflow-hidden rounded-2xl bg-neutral-900 shadow-xl"
    >
      {item.img ? (
        <div className="relative aspect-[4/3] sm:aspect-[21/9] md:aspect-[2/1]">
          <Image
            src={item.img}
            alt=""
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
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
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </span>
          )}
          {item.published_ts && (
            <time className="text-xs text-white/70">{timeAgo(item.published_ts)}</time>
          )}
        </div>
        <h1 className="mb-1 max-w-3xl font-serif text-xl font-bold leading-tight text-white sm:mb-2 sm:text-2xl md:text-3xl lg:text-4xl">
          {item.title}
        </h1>
        <p className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
          {item.summary}
        </p>
      </div>
    </Link>
  )
}
