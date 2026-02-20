import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getJournalistDetail } from '@/lib/api'
import { CATEGORIES, getCategoryColors } from '@/lib/categories'
import { JournalistAvatar } from '@/components/JournalistAvatar'
import { FeaturedCard } from '@/components/FeaturedCard'
import { HeadlineCard } from '@/components/HeadlineCard'
import { NewsCard } from '@/components/NewsCard'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const data = await getJournalistDetail(slug)
    return {
      title: `${data.journalist.name} — Periodismo2`,
      description: data.journalist.bio,
    }
  } catch {
    return { title: 'Periodista' }
  }
}

export default async function JournalistPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let data
  try {
    data = await getJournalistDetail(slug)
  } catch {
    notFound()
  }

  const j = data.journalist
  const articles = data.articles

  // Count articles per category
  const catCounts: Record<string, number> = {}
  for (const a of articles) {
    if (a.category) {
      catCounts[a.category] = (catCounts[a.category] || 0) + 1
    }
  }
  const topCategories = Object.entries(catCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)

  const heroArticle = articles[0]
  const headlineArticles = articles.slice(1, 7)
  const restArticles = articles.slice(7)

  return (
    <div className="mx-auto max-w-4xl">
      {/* Profile header */}
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex-shrink-0">
          <JournalistAvatar
            config={j.avatar_config}
            photoUrl={j.photo_url}
            size="lg"
            className="h-32 w-32"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
            {j.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">{j.role === 'writer' ? 'Periodista' : j.role}</p>
          <p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-400">{j.bio}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(j.specialties || []).map((s: string) => {
              const colors = getCategoryColors(s)
              return (
                <span
                  key={s}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.badge}`}
                >
                  {CATEGORIES[s]?.name || s}
                </span>
              )
            })}
          </div>
          <p className="mt-2 text-sm text-neutral-400 dark:text-neutral-500">
            {j.articles_written} articulos publicados
          </p>
        </div>
      </div>

      {/* Stats bar */}
      {topCategories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-3">
          <div className="rounded-lg border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">{articles.length}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Total</p>
          </div>
          {topCategories.map(([cat, count]) => {
            const colors = getCategoryColors(cat)
            return (
              <div key={cat} className="rounded-lg border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{count}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  <span className={`mr-1 inline-block h-2 w-2 rounded-full ${colors.dot}`} />
                  {CATEGORIES[cat]?.name || cat}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {/* Articles */}
      {articles.length > 0 ? (
        <>
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Articulos recientes
            </h2>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
          </div>

          {/* Hero article */}
          {heroArticle && (
            <div className="mb-6">
              <FeaturedCard item={heroArticle} />
            </div>
          )}

          {/* Headline grid */}
          {headlineArticles.length > 0 && (
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {headlineArticles.map((item) => (
                <HeadlineCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* Rest as regular cards */}
          {restArticles.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {restArticles.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="py-12 text-center text-neutral-500 dark:text-neutral-400">
          Aun no hay articulos publicados por este periodista.
        </p>
      )}
    </div>
  )
}
