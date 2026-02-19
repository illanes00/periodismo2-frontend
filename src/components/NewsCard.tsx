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

function extractDomain(url: string | null): string {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace('www.', '').replace(/\.(com|cl|org|net|es).*/, '')
  } catch {
    return ''
  }
}

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/article/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-800/80 dark:bg-neutral-900"
    >
      {item.img ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={item.img}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-850">
          <span className="text-4xl text-neutral-300 dark:text-neutral-600">P2</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            {extractDomain(item.source)}
          </span>
          {item.published_ts && (
            <time className="text-neutral-400 dark:text-neutral-600">{timeAgo(item.published_ts)}</time>
          )}
        </div>
        <h2 className="mb-2 line-clamp-2 font-serif text-base font-bold leading-snug text-neutral-900 transition group-hover:text-brand-700 dark:text-neutral-100 dark:group-hover:text-brand-500">
          {item.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {item.summary}
        </p>
      </div>
    </Link>
  )
}
