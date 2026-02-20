import { Suspense } from 'react'
import { getTopStories, getLatestNews, getHomeNews } from '@/lib/api'
import { HeroArticle } from '@/components/HeroArticle'
import { FeaturedHeroLayout } from '@/components/FeaturedHeroLayout'
import { HeadlineCard } from '@/components/HeadlineCard'
import { HorizontalCard } from '@/components/HorizontalCard'
import { CategorySection } from '@/components/CategorySection'
import { NewsCard } from '@/components/NewsCard'
import { TrendingTopics } from '@/components/TrendingTopics'
import { MobileTrending } from '@/components/MobileTrending'
import { InfiniteNewsFeed } from '@/components/InfiniteNewsFeed'
import { AdaptiveGrid } from '@/components/AdaptiveGrid'
import { CategoryGrid } from '@/components/CategoryGrid'
import { CultureSection } from '@/components/CultureSection'
import { WeatherWidget } from '@/components/WeatherWidget'
import { UltimoMinuto } from '@/components/UltimoMinuto'
import { OpinionSection } from '@/components/OpinionSection'

export const revalidate = 900

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
  const CATEGORY_SLUGS = ['politica', 'tecnologia', 'deportes'] as const

  const [topStories, homeNews, ...categoryResults] = await Promise.all([
    getTopStories(15),
    getHomeNews(),
    ...CATEGORY_SLUGS.map((cat) => getLatestNews(6, undefined, undefined, cat)),
  ])

  // If we have no stories at all, show a loading message
  if (topStories.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-neutral-500 dark:text-neutral-400">
          Cargando noticias...
        </p>
      </div>
    )
  }

  const hero = topStories[0]
  const featured = topStories.slice(1, 5)
  const headlines = topStories.slice(5, 8)
  const moreNews = topStories.slice(8, 15)

  // Collect IDs shown above the fold to avoid duplicates
  const shownIds = topStories.map((i) => i.id)
  const shownSet = new Set(shownIds)

  // Chile articles not already shown in top stories
  const chileArticles = homeNews.chile.filter((a) => !shownSet.has(a.id))

  return (
    <>
      {/* ===== LEVEL 1 — HERO + ULTIMAS SIDEBAR (La Tercera layout) ===== */}
      {hero && <FeaturedHeroLayout hero={hero} featured={featured} />}

      {/* ===== MOBILE: ULTIMO MINUTO (horizontal scroll) ===== */}
      <div className="lg:hidden">
        <UltimoMinuto />
      </div>

      {/* ===== LEVEL 2 — HEADLINES ===== */}
      {headlines.length > 0 && (
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {headlines.map((item) => (
            <HeadlineCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* ===== CATEGORY GRID ===== */}
      <CategoryGrid />

      {/* ===== LEVEL 3 — MORE NEWS + SIDEBAR (weather + trending) ===== */}
      {moreNews.length > 0 && (
        <div className="mb-10 flex gap-8">
          <div className="min-w-0 flex-1">
            <SectionHeading>Más noticias</SectionHeading>
            <div className="space-y-1">
              {moreNews.map((item) => (
                <HorizontalCard key={item.id} item={item} />
              ))}
            </div>
          </div>
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-28 space-y-4">
              <WeatherWidget />
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
      )}

      {/* Trending sidebar standalone when moreNews is empty */}
      {moreNews.length === 0 && (
        <div className="mb-10">
          <Suspense fallback={null}>
            <TrendingTopics />
          </Suspense>
        </div>
      )}

      {/* ===== MOBILE TRENDING ===== */}
      <Suspense fallback={null}>
        <MobileTrending />
      </Suspense>

      {/* ===== CHILE SECTION ===== */}
      {chileArticles.length > 0 && (
        <section className="mb-10">
          <SectionHeading color="red" id="chile">Chile</SectionHeading>
          <AdaptiveGrid minItemWidth={280} className="gap-5">
            {chileArticles.slice(0, 12).map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </AdaptiveGrid>
        </section>
      )}

      {/* ===== OPINION SECTION ===== */}
      <Suspense fallback={null}>
        <OpinionSection />
      </Suspense>

      {/* ===== QUE HACER EN SANTIAGO ===== */}
      <Suspense fallback={null}>
        <CultureSection />
      </Suspense>

      {/* ===== LEVEL 4 — BY CATEGORY ===== */}
      {CATEGORY_SLUGS.map((cat, i) => (
        <CategorySection key={cat} category={cat} articles={categoryResults[i].items} />
      ))}

      {/* ===== LEVEL 5 — LOAD MORE ===== */}
      <InfiniteNewsFeed excludeIds={[...shownIds, ...chileArticles.map((a) => a.id)]} />
    </>
  )
}

async function PaginatedLayout({
  source,
  before,
  category,
  country,
}: {
  source?: string
  before?: string
  category?: string
  country?: string
}) {
  const news = await getLatestNews(25, before, country, category)

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
              ? `Categoría: ${category.charAt(0).toUpperCase() + category.slice(1)}`
              : 'Últimas noticias de más de 100 fuentes'}
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
            Más noticias
          </h2>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        </div>
      )}

      {/* Grid */}
      <AdaptiveGrid minItemWidth={280} className="gap-5">
        {(before ? items : rest).map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </AdaptiveGrid>

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
            href={`/?before=${encodeURIComponent(news.next_cursor)}${source ? `&source=${encodeURIComponent(source)}` : ''}${category ? `&category=${encodeURIComponent(category)}` : ''}${country ? `&country=${encodeURIComponent(country)}` : ''}`}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-neutral-400 hover:shadow dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600"
          >
            Cargar más noticias
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
  searchParams: Promise<{ source?: string; before?: string; category?: string; country?: string }>
}) {
  const params = await searchParams
  const hasFilters = params.source || params.before || params.category || params.country

  return (
    <div className="min-w-0">
      {hasFilters ? (
        <PaginatedLayout
          source={params.source}
          before={params.before}
          category={params.category}
          country={params.country}
        />
      ) : (
        <HomeLayout />
      )}
    </div>
  )
}
