import Image from 'next/image'
import Link from 'next/link'
import { getRelatedArticles } from '@/lib/api'
import { AdaptiveGrid } from './AdaptiveGrid'

interface RelatedArticlesProps {
  articleId: string
  limit?: number
}

export async function RelatedArticles({ articleId, limit = 6 }: RelatedArticlesProps) {
  const articles = await getRelatedArticles(articleId, limit)

  if (articles.length === 0) {
    return null
  }

  return (
    <section className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <h2 className="mb-6 font-serif text-xl font-bold text-neutral-900 dark:text-white">
        Noticias relacionadas
      </h2>
      <AdaptiveGrid minItemWidth={280} className="gap-4">
        {articles.map((item) => (
          <Link
            key={item.id}
            href={`/article/${item.id}`}
            className="group flex gap-3 rounded-xl border border-neutral-200/80 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800/80 dark:bg-neutral-900"
          >
            {/* Thumbnail */}
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
              {item.img ? (
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-850">
                  <span className="text-lg text-neutral-300 dark:text-neutral-600">P2</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <h3 className="mb-1 line-clamp-2 text-sm font-bold leading-snug text-neutral-900 transition group-hover:text-brand-700 dark:text-neutral-100 dark:group-hover:text-brand-500">
                {item.title}
              </h3>
              {item.journalist_name && (
                <span className="text-xs text-neutral-400 dark:text-neutral-500">
                  {item.journalist_name}
                </span>
              )}
            </div>
          </Link>
        ))}
      </AdaptiveGrid>
    </section>
  )
}
