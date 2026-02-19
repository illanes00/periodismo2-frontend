import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getArticle } from '@/lib/api'
import { EntityTags } from '@/components/EntityTags'
import { RelatedArticles } from '@/components/RelatedArticles'
import { ShareButtons } from '@/components/ShareButtons'

export const revalidate = 300

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  try {
    const article = await getArticle(id)
    return {
      title: article.title,
      description: article.summary,
      openGraph: {
        title: article.title,
        description: article.summary,
        type: 'article',
        ...(article.img ? { images: [{ url: article.img }] } : {}),
      },
    }
  } catch {
    return { title: 'Artículo no encontrado' }
  }
}

function formatDate(ts: string | null): string {
  if (!ts) return ''
  return new Date(ts).toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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

export default async function ArticlePage({ params }: Props) {
  const { id } = await params
  let article
  try {
    article = await getArticle(id)
  } catch {
    notFound()
  }

  // JSON-LD structured data — sourced from our own API, not user input
  const jsonLdScript = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    image: article.img || undefined,
    datePublished: article.published_ts,
    publisher: { '@type': 'Organization', name: 'Periodismo2' },
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript }} />
      <article className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Volver a noticias
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-4xl lg:text-[2.75rem]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
            {article.published_ts && (
              <time className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {formatDate(article.published_ts)}
              </time>
            )}
            {article.source && (
              <>
                <span className="text-neutral-300 dark:text-neutral-700">&bull;</span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-500 dark:hover:text-brand-400"
                >
                  {extractDomain(article.source)}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </>
            )}
          </div>

          {/* Share buttons */}
          <div className="mt-4">
            <ShareButtons title={article.title} />
          </div>

          {/* Entity tags */}
          <Suspense fallback={null}>
            <EntityTags articleId={id} />
          </Suspense>
        </header>

        {/* Hero image */}
        {article.img && (
          <div className="relative -mx-4 mb-8 aspect-video overflow-hidden rounded-xl bg-neutral-100 sm:mx-0 dark:bg-neutral-800">
            <Image
              src={article.img}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Summary */}
        {article.summary && (
          <p className="mb-8 border-l-4 border-brand-600 pl-4 text-lg font-medium leading-relaxed text-neutral-700 dark:text-neutral-300">
            {article.summary}
          </p>
        )}

        {/* Body */}
        <div className="article-body">
          {article.body.split('\n').map((p, i) =>
            p.trim() ? <p key={i}>{p}</p> : null
          )}
        </div>

        {/* Related articles */}
        <Suspense fallback={null}>
          <RelatedArticles articleId={id} />
        </Suspense>

        {/* Bottom bar */}
        <div className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            &larr; Más noticias
          </Link>
          {article.source && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
            >
              Leer en fuente original
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          )}
        </div>
      </article>
    </>
  )
}
