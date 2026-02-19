import { Suspense } from 'react'
import { getHomeNews, getLatestNews } from '@/lib/api'
import { HeroArticle } from '@/components/HeroArticle'
import { NewsCard } from '@/components/NewsCard'
import { TrendingTopics } from '@/components/TrendingTopics'
import { CategoryTabs } from '@/components/CategoryTabs'
import { InfiniteNewsFeed } from '@/components/InfiniteNewsFeed'

export const revalidate = 300

function SectionHeading({
  children,
  color = 'neutral',
  id,
}: {
  children: React.ReactNode
  color?: 'red' | 'neutral' | 'blue'
  id?: string
}) {
  const colorClasses = {
    red: {
      text: 'text-red-600 dark:text-red-500',
      line: 'bg-red-200 dark:bg-red-900/50',
    },
    blue: {
      text: 'text-blue-600 dark:text-blue-500',
      line: 'bg-blue-200 dark:bg-blue-900/50',
    },
    neutral: {
      text: 'text-neutral-500 dark:text-neutral-400',
      line: 'bg-neutral-200 dark:bg-neutral-800',
    },
  }

  const c = colorClasses[color]

  return (
    <div id={id} className="mb-6 flex items-center gap-3">
      <h2 className={`text-sm font-semibold uppercase tracking-wider ${c.text}`}>
        {children}
      </h2>
      <div className={`h-px flex-1 ${c.line}`} />
    </div>
  )
}

async function HomeLayout() {
  const homeNews = await getHomeNews()

  const chileHero = homeNews.chile[0]
  const chileRest = homeNews.chile.slice(1, 5)
  const international = homeNews.international.slice(0, 12)

  // Collect IDs shown on the page to avoid duplicates in the infinite feed
  const shownIds = [
    ...(chileHero ? [chileHero.id] : []),
    ...chileRest.map((i) => i.id),
    ...international.map((i) => i.id),
  ]

  return (
    <>
      {/* ===== HERO: Biggest Chile story ===== */}
      {chileHero && (
        <div className="mb-8">
          <HeroArticle item={chileHero} />
        </div>
      )}

      {/* ===== Chile news + Trending sidebar ===== */}
      <SectionHeading color="red">Chile</SectionHeading>

      <div className="mb-12 flex flex-col gap-8 lg:flex-row">
        {/* Chile cards: main column */}
        <div className="min-w-0 flex-1">
          {chileRest.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              {chileRest.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Trending sidebar: visible on lg+ */}
        <aside className="w-full shrink-0 lg:w-72 xl:w-80">
          <div className="sticky top-20" id="tendencias">
            <Suspense
              fallback={
                <div className="rounded-xl border border-neutral-200/80 bg-white p-5 dark:border-neutral-800/80 dark:bg-neutral-900">
                  <div className="skeleton mb-4 h-4 w-24 rounded" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="skeleton h-8 w-20 rounded-lg" />
                    ))}
                  </div>
                </div>
              }
            >
              <TrendingTopics />
            </Suspense>
          </div>
        </aside>
      </div>

      {/* ===== Internacional: horizontal scroll on mobile, grid on desktop ===== */}
      {international.length > 0 && (
        <div className="mb-12">
          <SectionHeading color="blue">Internacional</SectionHeading>

          {/* Mobile: horizontal scroll */}
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-none sm:hidden">
            {international.map((item) => (
              <div key={item.id} className="w-72 shrink-0">
                <NewsCard item={item} />
              </div>
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {international.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* ===== Category Tabs ===== */}
      <div className="mb-12">
        <CategoryTabs />
      </div>

      {/* ===== Infinite scroll: Mas noticias ===== */}
      <InfiniteNewsFeed excludeIds={shownIds} />
    </>
  )
}

async function PaginatedLayout({
  source,
  before,
  category,
}: {
  source?: string
  before?: string
  category?: string
}) {
  const news = await getLatestNews(21, before, source, undefined, category)

  const items = news.items
  const hero = items[0]
  const rest = items.slice(1)

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Noticias
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {source
            ? `Fuente: ${source}`
            : category
              ? `Categoria: ${category.charAt(0).toUpperCase() + category.slice(1)}`
              : 'Ultimas noticias de mas de 100 fuentes'}
        </p>
      </div>

      {/* Hero */}
      {hero && !before && (
        <div className="mb-8">
          <HeroArticle item={hero} />
        </div>
      )}

      {/* Section divider */}
      {!before && rest.length > 0 && (
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Mas noticias
          </h2>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(before ? items : rest).map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            No hay noticias disponibles.
          </p>
        </div>
      )}

      {/* Load more */}
      {news.next_cursor && (
        <div className="mt-10 text-center">
          <a
            href={`/?before=${encodeURIComponent(news.next_cursor)}${source ? `&source=${encodeURIComponent(source)}` : ''}${category ? `&category=${encodeURIComponent(category)}` : ''}`}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-neutral-400 hover:shadow dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600"
          >
            Cargar mas noticias
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </a>
        </div>
      )}
    </>
  )
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; before?: string; category?: string }>
}) {
  const params = await searchParams
  const hasFilters = params.source || params.before || params.category

  return (
    <div className="min-w-0">
      {hasFilters ? (
        <PaginatedLayout
          source={params.source}
          before={params.before}
          category={params.category}
        />
      ) : (
        <HomeLayout />
      )}
    </div>
  )
}
