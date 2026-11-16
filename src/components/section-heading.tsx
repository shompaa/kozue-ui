import * as React from "react"
import { cn } from "cn"

export interface SectionHeadingProps {
  eyebrow?: string
  title: string
  as?: "h1" | "h2" | "h3"
  /** Contenido a la derecha del título (ej. un botón "Ver todo"). */
  children?: React.ReactNode
  className?: string
}

export function SectionHeading({ eyebrow, title, as: Tag = "h2", children, className }: SectionHeadingProps) {
  const heading = (
    <div>
      {eyebrow ? (
        <p className="flex items-center gap-2 text-[.9rem] font-semibold text-primary-text after:h-0.5 after:w-6 after:bg-primary-text after:content-['']">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="mb-4 font-display text-[clamp(1.9rem,3.2vw,2.5rem)] font-bold leading-[1.1] tracking-[-.04em] text-balance text-foreground">{title}</Tag>
    </div>
  )
  if (!children) return <div className={className}>{heading}</div>
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      {heading}
      <div className="mb-4">{children}</div>
    </div>
  )
}
