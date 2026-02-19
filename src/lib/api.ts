import type { NewsItemDetail, PaginatedNews, SourceCount } from './types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.periodismo2.cl'

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

export async function getLatestNews(
  limit = 20,
  before?: string,
  source?: string,
): Promise<PaginatedNews> {
  const params = new URLSearchParams({ limit: String(limit) })
  if (before) params.set('before', before)
  if (source) params.set('source', source)
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

export async function getSources(): Promise<SourceCount[]> {
  return fetchAPI<SourceCount[]>('/sources', 300)
}
