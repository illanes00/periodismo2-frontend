import type { MetadataRoute } from 'next'
import { getLatestNews } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://periodismo2.cl'

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'always', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: 'always', priority: 0.5 },
  ]

  try {
    const news = await getLatestNews(100)
    const articlePages: MetadataRoute.Sitemap = news.items.map((item) => ({
      url: `${base}/article/${item.id}`,
      lastModified: item.published_ts ? new Date(item.published_ts) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
    return [...staticPages, ...articlePages]
  } catch {
    return staticPages
  }
}
