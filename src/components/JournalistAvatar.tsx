import Image from 'next/image'
import type { AvatarConfig } from '@/lib/types'

type AvatarSize = 'sm' | 'md' | 'lg'

const SIZES: Record<AvatarSize, number> = {
  sm: 24,
  md: 40,
  lg: 64,
}

export function JournalistAvatar({
  config,
  photoUrl,
  size = 'md',
  className = '',
}: {
  config: AvatarConfig | null | undefined
  photoUrl?: string | null
  size?: AvatarSize
  className?: string
}) {
  const px = SIZES[size]

  // Use photo if available
  if (photoUrl) {
    return (
      <Image
        src={photoUrl}
        alt=""
        width={px}
        height={px}
        className={`inline-block flex-shrink-0 rounded-full ${className}`}
        aria-hidden
      />
    )
  }

  // Fallback: procedural SVG avatar
  const c = config || {}
  const bgColor = c.bg_color || '#94a3b8'

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      className={`inline-block flex-shrink-0 rounded-full ${className}`}
      style={{ backgroundColor: bgColor }}
      aria-hidden="true"
    >
      {c.skin === 'none' ? (
        <path d="M13 2L4.5 13h4.5L7 22l8.5-11h-4.5L13 2z" fill="#fbbf24" />
      ) : (
        <>
          <circle cx="12" cy="11" r="4.5" fill="#d4a574" />
          <ellipse cx="12" cy="20" rx="5" ry="3" fill="#d4a574" opacity="0.7" />
          <circle cx="10.5" cy="10.5" r="0.6" fill="#1a1a1a" />
          <circle cx="13.5" cy="10.5" r="0.6" fill="#1a1a1a" />
        </>
      )}
    </svg>
  )
}
