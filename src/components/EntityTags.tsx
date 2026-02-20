import Link from 'next/link'
import { getArticleEntities } from '@/lib/api'

function typeBadgeStyle(type: string): string {
  switch (type) {
    case 'person':
      return 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50'
    case 'org':
      return 'bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50'
    case 'place':
      return 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50'
    case 'event':
      return 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50'
    default:
      return 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
  }
}

function typeIcon(type: string) {
  const cls = 'h-3 w-3 flex-shrink-0'
  switch (type) {
    case 'person':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      )
    case 'org':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      )
    case 'place':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      )
    case 'event':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      )
    default:
      return null
  }
}

const TYPE_ORDER = ['person', 'org', 'place', 'event'] as const
const TYPE_LABELS: Record<string, string> = {
  person: 'Personas',
  org: 'Instituciones',
  place: 'Lugares',
  event: 'Eventos',
}

interface EntityTagsProps {
  articleId: string
}

export async function EntityTags({ articleId }: EntityTagsProps) {
  const entities = await getArticleEntities(articleId)

  if (entities.length === 0) {
    return null
  }

  // Group by type
  const grouped: Record<string, typeof entities> = {}
  for (const entity of entities) {
    const type = entity.type || 'other'
    if (!grouped[type]) grouped[type] = []
    grouped[type].push(entity)
  }

  // Sort by TYPE_ORDER, then any remaining
  const orderedTypes = [
    ...TYPE_ORDER.filter((t) => grouped[t]),
    ...Object.keys(grouped).filter((t) => !TYPE_ORDER.includes(t as any)),
  ]

  return (
    <div className="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-800">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        Temas relacionados
      </h3>
      <div className="space-y-3">
        {orderedTypes.map((type) => (
          <div key={type} className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 w-24 shrink-0">
              {TYPE_LABELS[type] || 'Otros'}
            </span>
            {grouped[type].map((entity) => (
              <Link
                key={entity.id}
                href={`/entities/${entity.id}`}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${typeBadgeStyle(entity.type)}`}
              >
                {typeIcon(entity.type)}
                {entity.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
