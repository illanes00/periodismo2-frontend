const GEO_COOKIE = 'user_country'
const DEFAULT_COUNTRY = 'CL'

export function getUserCountry(): string {
  if (typeof document === 'undefined') return DEFAULT_COUNTRY
  const match = document.cookie.match(new RegExp(`${GEO_COOKIE}=([^;]+)`))
  return match ? match[1] : DEFAULT_COUNTRY
}

export function setUserCountry(country: string) {
  document.cookie = `${GEO_COOKIE}=${country};path=/;max-age=${365 * 24 * 60 * 60}`
}
