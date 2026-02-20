'use client'

import Link from 'next/link'
import { JournalistAvatar } from './JournalistAvatar'
import type { AvatarConfig } from '@/lib/types'

interface Props {
  name: string
  slug?: string | null
  photoUrl?: string | null
  avatarConfig?: AvatarConfig | null
  size?: 'sm' | 'md'
}

export function JournalistByline({ name, slug, photoUrl, avatarConfig, size = 'sm' }: Props) {
  const content = (
    <span className="inline-flex items-center gap-1 rounded bg-neutral-100 px-1.5 py-0.5 font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
      <JournalistAvatar config={avatarConfig || null} photoUrl={photoUrl} size={size} />
      {name}
    </span>
  )

  if (slug) {
    return (
      <Link
        href={`/journalist/${slug}`}
        className="transition hover:opacity-80"
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </Link>
    )
  }

  return content
}
