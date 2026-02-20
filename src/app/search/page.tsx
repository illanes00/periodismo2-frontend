import { searchNews } from '@/lib/api'
import { NewsCard } from '@/components/NewsCard'
import { SearchInput } from '@/components/SearchInput'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Buscar',
}

function SearchResults({ q, before }: { q: string; before?: string }) {
  return (
    <Suspense
      fallback={
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white dark:border-neutral-800/80 dark:bg-neutral-900">
              <div className="skeleton aspect-[16/10]" />
              <div className="space-y-2 p-4">
                <div className="skeleton h-3 w-20 rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-3/4 rounded" />
              </div>
            </div>
          ))}
        </div>
      }
    >
      <SearchResultsInner q={q} before={before} />
    </Suspense>
  )
}

async function SearchResultsInner({ q, before }: { q: string; before?: string }) {
  const news = await searchNews(q, 20, before)

  return (
    <>
      {news.items.length === 0 ? (
        <div className="py-16 text-center">
          <svg className="mx-auto mb-4 h-12 w-12 text-neutral-300 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <p className="text-neutral-500 dark:text-neutral-400">
            No se encontraron noticias para &ldquo;{q}&rdquo;.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {news.items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {news.next_cursor && (
        <div className="mt-8 text-center">
          <a
            href={`/search?q=${encodeURIComponent(q)}&before=${encodeURIComponent(news.next_cursor)}`}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-neutral-400 hover:shadow dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600"
          >
            Mas resultados
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </a>
        </div>
      )}
    </>
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; before?: string }>
}) {
  const params = await searchParams
  const q = params.q || ''

  return (
    <div>
      {/* Search header with inline input */}
      <div className="mb-8">
        <h1 className="mb-4 font-serif text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
          Buscar noticias
        </h1>
        <SearchInput initialQuery={q} />
      </div>

      {/* Results */}
      {q.length >= 2 ? (
        <>
          <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
            Resultados para &ldquo;{q}&rdquo;
          </p>
          <SearchResults q={q} before={params.before} />
        </>
      ) : (
        <div className="py-16 text-center">
          <svg className="mx-auto mb-4 h-12 w-12 text-neutral-300 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <p className="text-neutral-500 dark:text-neutral-400">
            Ingresa al menos 2 caracteres para buscar.
          </p>
        </div>
      )}
    </div>
  )
}
