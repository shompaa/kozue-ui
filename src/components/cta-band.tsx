import * as React from "react"
import { cn } from "cn"
import { Card } from "./ui/card"

export interface CtaBandProps {
  title: string
  description?: string
  /** Botón o enlace de acción. */
  children?: React.ReactNode
  className?: string
}

export function CtaBand({ title, description, children, className }: CtaBandProps) {
  return (
    <Card variant="solid" padding="none" className={cn("flex-row flex-wrap items-center justify-between gap-6 px-9 py-7", className)}>
      <div>
        <h2 className="mb-1 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.1] tracking-[-.03em] text-balance text-foreground">{title}</h2>
        {description ? <p className="max-w-[46ch] text-pretty text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </Card>
  )
}
