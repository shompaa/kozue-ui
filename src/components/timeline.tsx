import * as React from "react"
import { cn } from "cn"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"

export interface TimelineEntry {
  /** Empresa o institución (línea destacada). */
  title: string
  /** Cargo. */
  subtitle: string
  /** Rango ya formateado, ej. "Marzo 2021 - Actualidad". */
  dates: string
  summary: string
  tags?: string[]
  /** Iniciales del logo. Si falta se calculan desde `title`. */
  initials?: string
  logoSrc?: string
}

const toInitials = (s: string) =>
  s
    .replace(/\(.*\)/, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

export interface TimelineProps {
  items: TimelineEntry[]
  className?: string
}

/** Línea de tiempo alternada: tarjeta de descripción + nodo numerado + tarjeta de identidad. En móvil, una columna. */
export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol
      className={cn(
        "relative mt-6 before:absolute before:bottom-0 before:left-1/2 before:top-0 before:w-0.5 before:-translate-x-1/2 before:bg-highlight/85 before:shadow-[0_0_7px] before:shadow-highlight/40 before:content-['']",
        "max-[800px]:before:left-[17px] max-[800px]:before:translate-x-0",
        className,
      )}
    >
      {items.map((item, i) => {
        const flip = i % 2 === 1
        return (
          <li
            key={`${item.title}-${i}`}
            className="reveal relative grid grid-cols-[1fr_56px_1fr] items-center py-5 max-[800px]:grid-cols-[34px_1fr] max-[800px]:items-start max-[800px]:gap-3"
          >
            <Card
              variant="solid"
              padding="none"
              className={cn(
                "row-start-1 rounded-xl p-5",
                flip ? "col-start-3" : "col-start-1",
                "max-[800px]:col-start-2 max-[800px]:row-start-2",
              )}
            >
              <p className="text-[.88rem] text-foreground/90">{item.summary}</p>
              {item.tags && item.tags.length > 0 ? (
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <li key={t}>
                      <Badge variant="tag" className="px-2.5 py-0.5">{t}</Badge>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Card>

            <span
              aria-hidden
              className="z-[2] col-start-2 row-start-1 grid size-[34px] justify-self-center place-items-center rounded-full border-2 border-tertiary bg-primary text-[.85rem] font-semibold tabular-nums text-primary-foreground shadow-[0_0_0_5px_var(--bg),0_0_18px_var(--highlight)] max-[800px]:col-start-1 max-[800px]:row-span-2 max-[800px]:row-start-1"
            >
              {i + 1}
            </span>

            <Card
              variant="glow"
              padding="none"
              className={cn(
                "row-start-1 flex-row items-center gap-4 rounded-xl p-5",
                flip ? "col-start-1" : "col-start-3",
                "max-[800px]:col-start-2 max-[800px]:row-start-1",
              )}
            >
              {item.logoSrc ? (
                <img src={item.logoSrc} alt="" className="size-[52px] shrink-0 rounded-[10px] object-cover" />
              ) : (
                <span aria-hidden className="grid size-[52px] shrink-0 place-items-center rounded-[10px] bg-highlight/30 font-extrabold tracking-[-1px] text-primary-text">
                  {item.initials ?? toInitials(item.title)}
                </span>
              )}
              <div>
                <p className="font-bold text-tertiary">{item.title}</p>
                <h3 className="mb-2 mt-0.5 font-display text-[1.15rem] font-semibold tracking-[-.01em] text-foreground">{item.subtitle}</h3>
                <p className="flex items-center gap-2 text-[.85rem] tabular-nums text-muted-foreground">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-4 text-highlight" aria-hidden>
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M7 2v6M17 2v6M3 10h18" />
                  </svg>
                  {item.dates}
                </p>
              </div>
            </Card>
          </li>
        )
      })}
    </ol>
  )
}
