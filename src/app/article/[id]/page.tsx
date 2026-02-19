import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticle } from '@/lib/api'

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
        <Link
          href="/"
          className="mb-4 inline-block text-sm text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          &larr; Volver
        </Link>

        <h1 className="mb-3 text-3xl font-bold leading-tight md:text-4xl">
          {article.title}
        </h1>

        <div className="mb-6 flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
          {article.published_ts && <time>{formatDate(article.published_ts)}</time>}
          {article.source && (
            <>
              <span>&middot;</span>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-800 dark:hover:text-neutral-200"
              >
                Fuente original
              </a>
            </>
          )}
        </div>

        {article.img && (
          <div className="relative mb-6 aspect-video overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={article.img}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-neutral max-w-none dark:prose-invert">
          {article.body.split('\n').map((p, i) =>
            p.trim() ? <p key={i}>{p}</p> : null
          )}
        </div>
      </article>
    </>
  )
}
