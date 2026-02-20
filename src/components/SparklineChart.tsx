'use client'

interface Props {
  data: { value: number }[]
  width?: number
  height?: number
  color?: string
}

export function SparklineChart({ data, width = 120, height = 32, color = '#3b82f6' }: Props) {
  if (data.length < 2) return null

  const values = data.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const padding = 2
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const points = values
    .map((v, i) => {
      const x = padding + (i / (values.length - 1)) * chartWidth
      const y = padding + chartHeight - ((v - min) / range) * chartHeight
      return `${x},${y}`
    })
    .join(' ')

  // Fill area under the line
  const firstX = padding
  const lastX = padding + chartWidth
  const bottomY = height - padding
  const fillPoints = `${firstX},${bottomY} ${points} ${lastX},${bottomY}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="block"
    >
      <polygon
        points={fillPoints}
        fill={color}
        fillOpacity={0.1}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
