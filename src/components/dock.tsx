import * as React from "react"
import { cn } from "cn"

export interface DockItem {
  href: string
  label: string
  /** Trazo SVG (viewBox 24). Serializable: sirve desde Astro. Alternativa: `icon`. */
  path?: string
  /** true = el trazo se rellena (logos); false = solo línea (iconos). */
  filled?: boolean
  icon?: React.ReactNode
  external?: boolean
  download?: boolean
}

export interface DockProps {
  items: DockItem[]
  /** aria-label del contenedor. */
  label?: string
  linkComponent?: React.ElementType
  className?: string
}

/** Barra flotante de accesos directos: vertical a la izquierda en desktop, horizontal abajo en móvil. */
export function Dock({ items, label = "links", linkComponent: Link = "a", className }: DockProps) {
  return (
    <aside
      aria-label={label}
      className={cn(
        "fixed left-3 top-1/2 z-[28] flex -translate-y-1/2 flex-col gap-1 rounded-[13px] border border-input bg-card/90 p-[5px] shadow-[0_10px_30px_-10px,inset_0_1px_0_rgba(255,255,255,.06)] shadow-highlight/30 backdrop-blur-md",
        "max-[800px]:bottom-3 max-[800px]:left-1/2 max-[800px]:top-auto max-[800px]:-translate-x-1/2 max-[800px]:translate-y-0 max-[800px]:flex-row",
        className,
      )}
    >
      {items.map((item) => (
        <Link
          key={item.href + item.label}
          href={item.href}
          aria-label={item.label}
          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...(item.download ? { download: "" } : {})}
          className="group relative grid size-9 place-items-center rounded-lg bg-surface-2 text-foreground transition-[transform,background-color] duration-200 motion-safe:active:scale-95 hover:translate-x-1 hover:bg-primary/80 focus-visible:translate-x-1 focus-visible:bg-primary/80 max-[800px]:hover:translate-x-0 max-[800px]:hover:-translate-y-[3px]"
        >
          {item.icon ?? (
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill={item.filled ? "currentColor" : "none"}
              stroke={item.filled ? "none" : "currentColor"}
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d={item.path} />
            </svg>
          )}
          <span
            aria-hidden
            className="pointer-events-none absolute left-11 whitespace-nowrap rounded-[5px] border border-input bg-surface-2 px-2 py-[3px] text-xs opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 max-[800px]:hidden"
          >
            {item.label}
          </span>
        </Link>
      ))}
    </aside>
  )
}
