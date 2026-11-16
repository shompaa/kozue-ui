import { cn } from "cn"
import { useMessages } from "../i18n"
import { Text } from "./text"

export interface ProgressBarProps {
  value: number
  total: number
  unit?: string
  label?: string
  emptyText?: string
  className?: string
}

export function ProgressBar({ value, total, unit, label, emptyText, className }: ProgressBarProps) {
  const m = useMessages().progressBar
  if (total <= 0) return <Text tone="muted" className={className}>{emptyText ?? m.empty}</Text>
  const done = Math.min(Math.max(value, 0), total)
  return (
    <div
      role="progressbar"
      aria-label={label ?? m.label}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={done}
      aria-valuetext={m.valueText(done, total, unit)}
      className={cn("h-2 overflow-hidden rounded-full bg-surface-2", className)}
    >
      <span className="block h-full rounded-full bg-primary transition-[width] duration-200" style={{ width: `${(done / total) * 100}%` }} />
    </div>
  )
}
