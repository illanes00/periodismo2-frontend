import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getArticle } from '@/lib/api'
import { EntityTags } from '@/components/EntityTags'
import { JournalistAvatar } from '@/components/JournalistAvatar'
import { RelatedArticles } from '@/components/RelatedArticles'
import { ShareButtons } from '@/components/ShareButtons'
import { ArticleBody } from '@/components/ArticleBody'

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
    timeZone: 'America/Santiago',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params
  let article
  try {
    article = await getArticle(id)
  } catch {
    notFound()
  }

  const jsonLdScript = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    image: article.img || undefined,
    datePublished: article.published_ts,
    author: article.journalist_name
      ? { '@type': 'Person', name: article.journalist_name }
      : undefined,
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
            {article.journalist_name && (
              <span className="inline-flex items-center gap-2 font-medium text-neutral-700 dark:text-neutral-300">
                <JournalistAvatar config={article.journalist_avatar} size="md" />
                <span>
                  <span className="block text-sm font-semibold">{article.journalist_name}</span>
                  {article.journalist_bio && (
                    <span className="block text-xs font-normal text-neutral-500 dark:text-neutral-400">
                      {article.journalist_bio}
                    </span>
                  )}
                </span>
              </span>
            )}
            {article.published_ts && (
              <>
                <span className="text-neutral-300 dark:text-neutral-700">&bull;</span>
                <time className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  {formatDate(article.published_ts)}
                </time>
              </>
            )}
          </div>

          {/* Share buttons */}
          <div className="mt-4">
            <ShareButtons title={article.title} />
          </div>
        </header>

        {/* Hero image */}
        {article.img && (
          <figure className="-mx-4 mb-8 sm:mx-0">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={article.img}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
            {article.img_credit && (
              <figcaption className="mt-1.5 text-right text-xs text-neutral-400 dark:text-neutral-500">
                Foto:{' '}
                <a
                  href={article.img_credit.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-neutral-300 underline-offset-2 transition hover:text-neutral-600 dark:decoration-neutral-600 dark:hover:text-neutral-300"
                >
                  {article.img_credit.name}
                </a>
                {' / '}
                <a
                  href={article.img_credit.unsplash_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-neutral-300 underline-offset-2 transition hover:text-neutral-600 dark:decoration-neutral-600 dark:hover:text-neutral-300"
                >
                  Unsplash
                </a>
              </figcaption>
            )}
          </figure>
        )}

        {/* Summary */}
        {article.summary && (
          <p className="mb-8 border-l-4 border-brand-600 pl-4 text-lg font-medium leading-relaxed text-neutral-700 dark:text-neutral-300">
            {article.summary}
          </p>
        )}

        {/* Body */}
        <ArticleBody body={article.body} />

        {/* Entity tags — grouped by type at bottom */}
        <Suspense fallback={null}>
          <EntityTags articleId={id} />
        </Suspense>

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
          {article.journalist_slug && (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
              <JournalistAvatar config={article.journalist_avatar} size="sm" />
              Más de {article.journalist_name}
            </span>
          )}
        </div>
      </article>
    </>
  )
}
