import Image from 'next/image'
import Link from 'next/link'
import type { NewsItem } from '@/lib/types'

function formatDate(ts: string | null): string {
  if (!ts) return ''
  return new Date(ts).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function HeroArticle({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/article/${item.id}`}
      className="group relative block overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 md:col-span-2 lg:col-span-2"
    >
      {item.img && (
        <div className="relative aspect-[2/1] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={item.img}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 p-6 text-white">
            <p className="mb-2 text-xs opacity-80">
              {formatDate(item.published_ts)}
            </p>
            <h1 className="mb-2 text-2xl font-bold leading-tight md:text-3xl">
              {item.title}
            </h1>
            <p className="line-clamp-2 text-sm opacity-90">
              {item.summary}
            </p>
          </div>
        </div>
      )}
      {!item.img && (
        <div className="p-6">
          <p className="mb-2 text-xs text-neutral-500">{formatDate(item.published_ts)}</p>
          <h1 className="mb-2 text-2xl font-bold text-neutral-900 group-hover:text-red-700 dark:text-neutral-100 md:text-3xl">
            {item.title}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">{item.summary}</p>
        </div>
      )}
    </Link>
  )
}
