const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.periodismo2.cl'

export async function GET() {
  const res = await fetch(`${API_BASE}/feed.xml`, {
    next: { revalidate: 300 },
  })
  const xml = await res.text()
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
