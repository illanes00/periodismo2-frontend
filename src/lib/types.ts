export interface NewsItem {
  id: string
  title: string
  summary: string
  url: string
  source: string | null
  img: string | null
  bot_name: string | null
  published_ts: string | null
  country: string | null
  category: string | null
}

export interface HomeNews {
  chile: NewsItem[]
  international: NewsItem[]
}

export interface NewsItemDetail extends NewsItem {
  body: string
  entities: unknown
  sentiment: number | null
  ingest_ts: string | null
}

export interface PaginatedNews {
  items: NewsItem[]
  next_cursor: string | null
}

export interface SourceCount {
  source: string
  count: number
}

export interface TickerData {
  dolar: { valor: number }
  euro: { valor: number }
  uf: { valor: number }
  utm: { valor: number }
}

export interface TrendingTopic {
  keyword: string
  count: number
}

export interface RecommendedNews {
  hero: NewsItem | null
  featured: NewsItem[]
  trending: NewsItem[]
  latest: NewsItem[]
  by_category: Record<string, NewsItem[]>
}

export interface Entity {
  id: number
  name: string
  type: 'person' | 'org' | 'place' | 'event'
  article_count: number
  last_seen: string | null
}

export interface EntityDetail extends Entity {
  description: string | null
  articles: NewsItem[]
}
