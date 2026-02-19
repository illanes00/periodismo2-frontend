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

function extractDomain(url: string | null): string {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return ''
  }
}

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/article/${item.id}`}
      className="group block overflow-hidden rounded-lg border border-neutral-200 bg-white transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    >
      {item.img && (
        <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={item.img}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span>{extractDomain(item.source)}</span>
          {item.published_ts && (
            <>
              <span>&middot;</span>
              <time>{formatDate(item.published_ts)}</time>
            </>
          )}
        </div>
        <h2 className="mb-1 line-clamp-2 text-base font-semibold leading-tight text-neutral-900 group-hover:text-red-700 dark:text-neutral-100 dark:group-hover:text-red-400">
          {item.title}
        </h2>
        <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
          {item.summary}
        </p>
      </div>
    </Link>
  )
}
