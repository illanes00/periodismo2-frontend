export interface NewsItem {
  id: string
  title: string
  summary: string
  img: string | null
  bot_name: string | null
  published_ts: string | null
  country: string | null
  category: string | null
  journalist_name: string | null
  journalist_slug: string | null
  journalist_photo_url: string | null
  is_rewritten: boolean
}

export interface HomeNews {
  chile: NewsItem[]
  international: NewsItem[]
}

export interface ImageCredit {
  name: string
  profile: string
  unsplash_url: string
}

export interface NewsItemDetail extends NewsItem {
  body: string
  entities: unknown
  sentiment: number | null
  ingest_ts: string | null
  journalist_bio: string | null
  journalist_avatar: AvatarConfig | null
  img_credit: ImageCredit | null
}

export interface PaginatedNews {
  items: NewsItem[]
  next_cursor: string | null
}

export interface AvatarConfig {
  skin?: string
  hair?: string
  accessory?: string
  bg_color?: string
}

export interface JournalistInfo {
  slug: string
  name: string
  bio: string
  role: string
  avatar_config: AvatarConfig
  photo_url: string | null
  specialties: string[]
  is_active: boolean
  articles_written: number
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
  label?: string
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
