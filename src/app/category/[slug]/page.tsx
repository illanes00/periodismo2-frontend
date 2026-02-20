import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLatestNews, getJournalists } from '@/lib/api'
import { CATEGORIES, getCategoryColors } from '@/lib/categories'
import { HeroArticle } from '@/components/HeroArticle'
import { NewsCard } from '@/components/NewsCard'
import { HorizontalCard } from '@/components/HorizontalCard'
import { JournalistAvatar } from '@/components/JournalistAvatar'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cat = CATEGORIES[slug]
  if (!cat) return { title: 'Categoría no encontrada' }
  return {
    title: `${cat.name} — Periodismo2`,
    description: cat.desc,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cat = CATEGORIES[slug]
  if (!cat) notFound()

  const colors = getCategoryColors(slug)

  const [news, journalists] = await Promise.all([
    getLatestNews(13, undefined, undefined, slug),
    getJournalists(),
  ])

  const beatJournalists = journalists.filter((j) =>
    j.specialties.includes(slug)
  )

  const hero = news.items[0]
  const grid = news.items.slice(1, 7)
  const more = news.items.slice(7)

  return (
    <div>
      {/* Header with colored accent */}
      <div className="mb-8">
        <div className={`mb-2 h-1 w-16 rounded ${colors.bg}`} />
        <h1 className="font-serif text-3xl font-bold text-neutral-900 dark:text-white">
          {cat.name}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">{cat.desc}</p>
      </div>

      {/* Hero */}
      {hero && (
        <div className="mb-8">
          <HeroArticle item={hero} />
        </div>
      )}

      {/* Grid + Sidebar */}
      <div className="mb-8 flex gap-8">
        <div className="min-w-0 flex-1">
          {grid.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        {beatJournalists.length > 0 && (
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Periodistas
              </h3>
              <div className="space-y-3">
                {beatJournalists.map((j) => (
                  <Link
                    key={j.slug}
                    href={`/journalist/${j.slug}`}
                    className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    <JournalistAvatar config={j.avatar_config} photoUrl={j.photo_url} size="md" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{j.name}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {j.articles_written} artículos
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* More articles */}
      {more.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Más en {cat.name}
            </h2>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="space-y-1">
            {more.map((item) => (
              <HorizontalCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {news.items.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            No hay noticias en esta categoría.
          </p>
        </div>
      )}
    </div>
  )
}
