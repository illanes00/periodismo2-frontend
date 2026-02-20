import type { NewsItem } from '@/lib/types'
import { HeroArticle } from './HeroArticle'
import { FeaturedCard } from './FeaturedCard'
import { UltimasColumn } from './UltimasColumn'

interface Props {
  hero: NewsItem
  featured: NewsItem[]
}

export function FeaturedHeroLayout({ hero, featured }: Props) {
  return (
    <div className="mb-10 flex gap-6">
      {/* Left column: Hero + Featured 2x2 */}
      <div className="min-w-0 flex-1 lg:w-2/3">
        <div className="mb-5">
          <HeroArticle item={hero} />
        </div>
        {featured.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featured.map((item) => (
              <FeaturedCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Right column: Ultimas — desktop only */}
      <aside className="hidden w-80 shrink-0 lg:block">
        <div className="sticky top-24">
          <UltimasColumn />
        </div>
      </aside>
    </div>
  )
}
