import * as React from "react"
import { cn } from "cn"

export interface TechItem {
  title: string
  /** Color de marca sin "#". */
  hex: string
  /** Trazo SVG, por ejemplo de simple-icons (viewBox 24) o devicon (viewBox 128). */
  path?: string
  /** viewBox del trazo. Por defecto "0 0 24 24". */
  viewBox?: string
  /** Sin `path`: insignia cuadrada con estas letras. */
  text?: string
}

/** Luminancia relativa WCAG de un color hex de 6 dígitos (sin "#"). */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Logos casi negros (Next.js, Vercel...) se pintan con el color de texto para no perderse sobre fondos oscuros. */
const DARK_LUMINANCE = 0.06

export function TechIcon({ title, hex, path, viewBox = "0 0 24 24", text, className }: TechItem & { className?: string }) {
  const dark = !!path && luminance(hex) < DARK_LUMINANCE
  return (
    <li
      tabIndex={0}
      className={cn(
        "group relative grid rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-ring",
        className,
      )}
    >
      <svg
        viewBox={path ? viewBox : "0 0 24 24"}
        role="img"
        aria-label={title}
        className={cn(dark && "text-foreground", "size-[26px] transition-transform duration-150 group-hover:-translate-y-[3px] group-hover:scale-[1.15] group-focus-visible:-translate-y-[3px] group-focus-visible:scale-[1.15]")}
      >
        {path ? (
          <path d={path} fill={dark ? "currentColor" : `#${hex}`} />
        ) : (
          <>
            <rect x="1" y="1" width="22" height="22" rx="5" fill={`#${hex}`} />
            <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff" fontFamily="Inter, sans-serif">
              {text}
            </text>
          </>
        )}
      </svg>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[130%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[5px] border border-input bg-surface-2 px-2 py-0.5 text-[.7rem] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {title}
      </span>
    </li>
  )
}

export interface TechStackRowProps {
  label: string
  items: TechItem[]
  className?: string
}

export function TechStackRow({ label, items, className }: TechStackRowProps) {
  return (
    <div className={cn("flex min-h-12 items-center gap-3 rounded-lg border border-border bg-card px-3 py-1.5", className)}>
      <span className="shrink-0 basis-[120px] text-[.8rem] text-muted-foreground">{label}</span>
      <ul className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <TechIcon key={item.title} {...item} />
        ))}
      </ul>
    </div>
  )
}

export interface TechStackProps {
  groups: { label: string; items: TechItem[] }[]
  className?: string
}

export function TechStack({ groups, className }: TechStackProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {groups.map((g) => (
        <TechStackRow key={g.label} label={g.label} items={g.items} />
      ))}
    </div>
  )
}
