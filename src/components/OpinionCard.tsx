import Link from 'next/link'
import type { NewsItem } from '@/lib/types'
import { JournalistAvatar } from './JournalistAvatar'
import { timeAgo } from '@/lib/utils'

export function OpinionCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/article/${item.id}`}
      className="group flex gap-4 rounded-xl border-l-4 border-l-indigo-500 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-neutral-900"
    >
      {/* Author avatar */}
      <div className="flex-shrink-0">
        <JournalistAvatar config={null} photoUrl={item.journalist_photo_url} size="lg" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {item.journalist_name && (
          <p className="mb-1 text-sm font-semibold text-indigo-700 dark:text-indigo-400">
            {item.journalist_name}
          </p>
        )}
        <h3 className="mb-1 line-clamp-2 font-serif text-base font-bold leading-snug text-neutral-900 transition group-hover:text-indigo-700 dark:text-neutral-100 dark:group-hover:text-indigo-400">
          {item.title}
        </h3>
        <p className="line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
          {item.summary}
        </p>
        {item.published_ts && (
          <time className="mt-2 block text-xs text-neutral-400 dark:text-neutral-500">
            {timeAgo(item.published_ts)}
          </time>
        )}
      </div>
    </Link>
  )
}
