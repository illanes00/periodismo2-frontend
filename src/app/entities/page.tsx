import type { Metadata } from 'next'
import Link from 'next/link'
import { getEntities } from '@/lib/api'
import type { Entity } from '@/lib/types'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Entidades',
  description: 'Personas, organizaciones, lugares y eventos mencionados en las noticias.',
}

const ENTITY_TYPES = [
  { slug: 'person', label: 'Personas', icon: PersonIcon },
  { slug: 'org', label: 'Organizaciones', icon: OrgIcon },
  { slug: 'place', label: 'Lugares', icon: PlaceIcon },
  { slug: 'event', label: 'Eventos', icon: EventIcon },
] as const

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  )
}

function OrgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  )
}

function PlaceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  )
}

function EventIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  )
}

function typeColor(type: string) {
  switch (type) {
    case 'person':
      return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    case 'org':
      return 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    case 'place':
      return 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    case 'event':
      return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    default:
      return 'bg-neutral-50 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
  }
}

function EntityCard({ entity }: { entity: Entity }) {
  return (
    <Link
      href={`/entities/${entity.id}`}
      className="group flex items-center gap-4 rounded-xl border border-neutral-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-800/80 dark:bg-neutral-900"
    >
      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${typeColor(entity.type)}`}>
        {entity.type === 'person' && <PersonIcon className="h-5 w-5" />}
        {entity.type === 'org' && <OrgIcon className="h-5 w-5" />}
        {entity.type === 'place' && <PlaceIcon className="h-5 w-5" />}
        {entity.type === 'event' && <EventIcon className="h-5 w-5" />}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium text-neutral-900 transition group-hover:text-brand-700 dark:text-neutral-100 dark:group-hover:text-brand-500">
          {entity.name}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {entity.article_count} {entity.article_count === 1 ? 'articulo' : 'articulos'}
        </p>
      </div>
      <svg className="h-5 w-5 flex-shrink-0 text-neutral-300 transition group-hover:text-neutral-500 dark:text-neutral-600 dark:group-hover:text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  )
}

function EntitySection({
  title,
  icon: Icon,
  entities,
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  entities: Entity[]
}) {
  if (entities.length === 0) return null
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <Icon className="h-4 w-4" />
          {title}
        </div>
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entities.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    </section>
  )
}

export default async function EntitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const params = await searchParams
  const filterType = params.type

  if (filterType) {
    const entities = await getEntities(filterType, 60)
    const config = ENTITY_TYPES.find((t) => t.slug === filterType)
    return (
      <div className="mx-auto max-w-5xl">
        <Link
          href="/entities"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Todas las entidades
        </Link>
        <header className="mb-8">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {config?.label || filterType}
          </h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            {entities.length} {entities.length === 1 ? 'entidad encontrada' : 'entidades encontradas'}
          </p>
        </header>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {entities.map((entity) => (
            <EntityCard key={entity.id} entity={entity} />
          ))}
        </div>
        {entities.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              No hay entidades de este tipo aun.
            </p>
          </div>
        )}
      </div>
    )
  }

  const [persons, orgs, places, events] = await Promise.all([
    getEntities('person', 12),
    getEntities('org', 12),
    getEntities('place', 12),
    getEntities('event', 12),
  ])

  const isEmpty = persons.length === 0 && orgs.length === 0 && places.length === 0 && events.length === 0

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Entidades
        </h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          Personas, organizaciones, lugares y eventos mencionados en las noticias.
        </p>
      </header>

      {/* Type filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {ENTITY_TYPES.map((t) => (
          <Link
            key={t.slug}
            href={`/entities?type=${t.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:bg-neutral-750"
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </Link>
        ))}
      </div>

      {isEmpty ? (
        <div className="py-20 text-center">
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            No hay entidades extraidas aun. Las entidades se generan automaticamente a partir de las noticias.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          <EntitySection title="Personas" icon={PersonIcon} entities={persons} />
          <EntitySection title="Organizaciones" icon={OrgIcon} entities={orgs} />
          <EntitySection title="Lugares" icon={PlaceIcon} entities={places} />
          <EntitySection title="Eventos" icon={EventIcon} entities={events} />
        </div>
      )}
    </div>
  )
}
