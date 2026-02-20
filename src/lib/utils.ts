export function timeAgo(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  if (diff < 0) return 'Ahora'
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Ahora'
  if (mins < 60) return `hace ${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `hace ${hours}h`
  const days = Math.floor(hours / 24)
  return `hace ${days}d`
}

export function formatDateCL(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-CL', {
    timeZone: 'America/Santiago',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function readingTime(text: string | null | undefined): string {
  if (!text) return '1 min'
  const words = text.split(/\s+/).length
  const mins = Math.max(1, Math.ceil(words / 200))
  return `${mins} min`
}

const COUNTRY_FLAGS: Record<string, string> = {
  CL: '\u{1F1E8}\u{1F1F1}',
  AR: '\u{1F1E6}\u{1F1F7}',
  CO: '\u{1F1E8}\u{1F1F4}',
  PE: '\u{1F1F5}\u{1F1EA}',
  US: '\u{1F1FA}\u{1F1F8}',
  BR: '\u{1F1E7}\u{1F1F7}',
  MX: '\u{1F1F2}\u{1F1FD}',
  GB: '\u{1F1EC}\u{1F1E7}',
  ES: '\u{1F1EA}\u{1F1F8}',
  FR: '\u{1F1EB}\u{1F1F7}',
  DE: '\u{1F1E9}\u{1F1EA}',
  SV: '\u{1F1F8}\u{1F1FB}',
  PA: '\u{1F1F5}\u{1F1E6}',
  HN: '\u{1F1ED}\u{1F1F3}',
  CR: '\u{1F1E8}\u{1F1F7}',
  GT: '\u{1F1EC}\u{1F1F9}',
  VE: '\u{1F1FB}\u{1F1EA}',
  EC: '\u{1F1EA}\u{1F1E8}',
  UY: '\u{1F1FA}\u{1F1FE}',
  BO: '\u{1F1E7}\u{1F1F4}',
  CU: '\u{1F1E8}\u{1F1FA}',
  DO: '\u{1F1E9}\u{1F1F4}',
  IT: '\u{1F1EE}\u{1F1F9}',
  CN: '\u{1F1E8}\u{1F1F3}',
  JP: '\u{1F1EF}\u{1F1F5}',
  AU: '\u{1F1E6}\u{1F1FA}',
  IL: '\u{1F1EE}\u{1F1F1}',
  UA: '\u{1F1FA}\u{1F1E6}',
  RU: '\u{1F1F7}\u{1F1FA}',
  INT: '\u{1F310}',
  LATAM: '\u{1F310}',
}

export function countryFlag(code: string | null | undefined): string {
  if (!code || code === 'CL') return ''
  return COUNTRY_FLAGS[code] || '\u{1F310}'
}
