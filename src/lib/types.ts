export interface NewsItem {
  id: string
  title: string
  summary: string
  url: string
  source: string | null
  img: string | null
  bot_name: string | null
  published_ts: string | null
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
