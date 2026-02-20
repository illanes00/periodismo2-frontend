import Link from 'next/link'
import { getTrendingTopics } from '@/lib/api'

export async function TrendingTopics() {
  const topics = await getTrendingTopics(6)

  if (topics.length === 0) {
    return null
  }

  return (
    <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        <svg className="h-4 w-4 text-brand-600 dark:text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
        </svg>
        Tendencias
      </h3>
      <div className="flex flex-wrap gap-2">
        {topics.slice(0, 15).map((topic) => (
          <Link
            key={topic.keyword}
            href={`/search?q=${encodeURIComponent(topic.keyword)}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-brand-800 dark:hover:bg-brand-900/30 dark:hover:text-brand-400"
          >
            <span>{topic.keyword.charAt(0).toUpperCase() + topic.keyword.slice(1)}</span>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">{topic.count}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
