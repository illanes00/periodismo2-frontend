export const CATEGORIES: Record<string, { name: string; desc: string; color: string }> = {
  politica: { name: 'Política', desc: 'Gobierno, congreso y elecciones', color: 'red' },
  economia: { name: 'Economía', desc: 'Mercados, empleo y finanzas', color: 'emerald' },
  deportes: { name: 'Deportes', desc: 'Fútbol, tenis y más', color: 'blue' },
  tecnologia: { name: 'Tecnología', desc: 'IA, startups y gadgets', color: 'violet' },
  mundo: { name: 'Mundo', desc: 'Noticias internacionales', color: 'amber' },
  ciencia: { name: 'Ciencia', desc: 'Descubrimientos y medio ambiente', color: 'teal' },
  salud: { name: 'Salud', desc: 'Medicina y bienestar', color: 'pink' },
  cultura: { name: 'Cultura', desc: 'Arte, música y literatura', color: 'orange' },
  entretenimiento: { name: 'Entretenimiento', desc: 'TV, cine y redes', color: 'fuchsia' },
  pais: { name: 'País', desc: 'Noticias nacionales de Chile', color: 'sky' },
  gaming: { name: 'Gaming', desc: 'Videojuegos y esports', color: 'lime' },
}

/** Mapping from category color names to Tailwind class sets (avoid dynamic class generation) */
export const CATEGORY_COLORS: Record<string, { badge: string; dot: string; border: string; bg: string }> = {
  red: {
    badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    dot: 'bg-red-500',
    border: 'border-l-red-500',
    bg: 'bg-red-500',
  },
  emerald: {
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    dot: 'bg-emerald-500',
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-500',
  },
  blue: {
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    dot: 'bg-blue-500',
    border: 'border-l-blue-500',
    bg: 'bg-blue-500',
  },
  violet: {
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    dot: 'bg-violet-500',
    border: 'border-l-violet-500',
    bg: 'bg-violet-500',
  },
  amber: {
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    dot: 'bg-amber-500',
    border: 'border-l-amber-500',
    bg: 'bg-amber-500',
  },
  teal: {
    badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    dot: 'bg-teal-500',
    border: 'border-l-teal-500',
    bg: 'bg-teal-500',
  },
  pink: {
    badge: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    dot: 'bg-pink-500',
    border: 'border-l-pink-500',
    bg: 'bg-pink-500',
  },
  orange: {
    badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    dot: 'bg-orange-500',
    border: 'border-l-orange-500',
    bg: 'bg-orange-500',
  },
  fuchsia: {
    badge: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
    dot: 'bg-fuchsia-500',
    border: 'border-l-fuchsia-500',
    bg: 'bg-fuchsia-500',
  },
  sky: {
    badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    dot: 'bg-sky-500',
    border: 'border-l-sky-500',
    bg: 'bg-sky-500',
  },
  lime: {
    badge: 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
    dot: 'bg-lime-500',
    border: 'border-l-lime-500',
    bg: 'bg-lime-500',
  },
}

/** Get color classes for a category slug. Falls back to neutral. */
export function getCategoryColors(category: string | null) {
  if (!category) return CATEGORY_COLORS.red // fallback
  const cat = CATEGORIES[category]
  if (!cat) return CATEGORY_COLORS.red
  return CATEGORY_COLORS[cat.color] || CATEGORY_COLORS.red
}
