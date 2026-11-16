import * as React from "react"
import { cn } from "cn"

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export function Chip({ active = false, className, type = "button", ...props }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-sm font-medium transition-[color,transform] duration-200 motion-safe:active:scale-[.98] focus-visible:outline-2 focus-visible:outline-ring",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface-2 text-muted-foreground hover:text-foreground",
        className,
      )}
      {...props}
    />
  )
}
