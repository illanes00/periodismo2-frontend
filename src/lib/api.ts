import type { Entity, EntityDetail, HomeNews, JournalistInfo, NewsItem, NewsItemDetail, PaginatedNews, RecommendedNews, TrendingTopic } from './types'

const API_PUBLIC = 'https://api.periodismo2.cl'
const API_INTERNAL = process.env.API_URL || API_PUBLIC
const isServer = typeof window === 'undefined'
const API_BASE = isServer ? API_INTERNAL : API_PUBLIC

async function fetchAPI<T>(path: string, revalidate?: number): Promise<T> {
  const url = `${API_BASE}${path}`
  const res = await fetch(url, {
    next: revalidate !== undefined ? { revalidate } : undefined,
  })
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export async function getHomeNews(country = 'CL'): Promise<HomeNews> {
  return fetchAPI<HomeNews>(`/news/home?country=${country}`, 300)
}

export async function getTopStories(limit = 7): Promise<NewsItem[]> {
  try {
    return await fetchAPI<NewsItem[]>(`/news/top?limit=${limit}`, 300)
  } catch {
    return []
  }
}

export async function getRecommendedNews(country = 'CL'): Promise<RecommendedNews> {
  return fetchAPI<RecommendedNews>(`/news/recommended?country=${country}`, 300)
}

export async function getLatestNews(
  limit = 20,
  before?: string,
  country?: string,
  category?: string,
): Promise<PaginatedNews> {
  const params = new URLSearchParams({ limit: String(limit) })
  if (before) params.set('before', before)
  if (country) params.set('country', country)
  if (category) params.set('category', category)
  return fetchAPI<PaginatedNews>(`/news/latest?${params}`, 300)
}

export async function getArticle(id: string): Promise<NewsItemDetail> {
  return fetchAPI<NewsItemDetail>(`/news/${id}`, 300)
}

export async function searchNews(
  q: string,
  limit = 20,
  before?: string,
): Promise<PaginatedNews> {
  const params = new URLSearchParams({ q, limit: String(limit) })
  if (before) params.set('before', before)
  return fetchAPI<PaginatedNews>(`/news/search/?${params}`)
}

export async function getJournalists(): Promise<JournalistInfo[]> {
  try {
    return await fetchAPI<JournalistInfo[]>('/journalists', 300)
  } catch {
    return []
  }
}

export async function getJournalistDetail(slug: string): Promise<{ journalist: JournalistInfo; articles: NewsItem[] }> {
  return fetchAPI(`/journalists/${slug}`, 300)
}

export async function getRelatedArticles(id: string, limit = 5): Promise<NewsItem[]> {
  try {
    return await fetchAPI<NewsItem[]>(`/news/${id}/related?limit=${limit}`, 300)
  } catch {
    return []
  }
}

export async function getTrendingTopics(hours = 6): Promise<TrendingTopic[]> {
  try {
    return await fetchAPI<TrendingTopic[]>(`/news/trending-topics?hours=${hours}`, 300)
  } catch {
    return []
  }
}

export async function getEntities(type?: string, limit = 20): Promise<Entity[]> {
  const params = new URLSearchParams({ limit: String(limit) })
  if (type) params.set('type', type)
  try {
    return await fetchAPI<Entity[]>(`/entities?${params}`, 300)
  } catch {
    return []
  }
}

export async function getEntityDetail(id: number): Promise<EntityDetail> {
  return fetchAPI<EntityDetail>(`/entities/${id}`, 300)
}

export async function getArticleEntities(articleId: string): Promise<Entity[]> {
  try {
    return await fetchAPI<Entity[]>(`/news/${articleId}/entities`, 300)
  } catch {
    return []
  }
}
