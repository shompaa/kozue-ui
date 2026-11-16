import { cn } from "cn"
import { useMessages } from "../i18n"

export interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  className?: string
  label?: string
}

export function Sparkline({ data, width = 200, height = 56, className, label }: SparklineProps) {
  const m = useMessages().sparkline
  if (data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const step = width / (data.length - 1)
  const points = data
    .map((v, i) => `${(i * step).toFixed(1)},${(height - ((v - min) / span) * height).toFixed(1)}`)
    .join(" ")
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={label ?? m.trend(data[0], data[data.length - 1])}
      className={cn("h-14 w-full overflow-visible text-success", className)}
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
