'use client'

import { useRef, useState, useEffect, Children, type ReactNode } from 'react'

interface AdaptiveGridProps {
  children: ReactNode
  /** Minimum width of each grid item in pixels */
  minItemWidth?: number
  className?: string
}

export function AdaptiveGrid({
  children,
  minItemWidth = 280,
  className = '',
}: AdaptiveGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [cols, setCols] = useState(0)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    const update = () => {
      const columns = getComputedStyle(el).gridTemplateColumns.split(' ').length
      setCols(columns)
    }

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const items = Children.toArray(children)
  // SSR (cols=0): show all items; Client (cols=1): single col = always complete rows
  const visible =
    cols > 1 ? items.slice(0, Math.floor(items.length / cols) * cols) : items

  return (
    <div
      ref={gridRef}
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${minItemWidth}px, 100%), 1fr))`,
      }}
    >
      {visible}
    </div>
  )
}
