import * as React from "react"
import { cn } from "cn"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"
import { Skeleton } from "./skeleton"

const ASPECTS = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  portrait: "aspect-[3/4]",
} as const

export interface MediaCardProps {
  image: string
  /** Vacío = imagen decorativa. */
  imageAlt?: string
  title: React.ReactNode
  description?: React.ReactNode
  /** Línea pequeña sobre el título (categoría, etiquetas). */
  eyebrow?: React.ReactNode
  /** Elemento flotante sobre la imagen, arriba a la izquierda (ej. un Badge). */
  badge?: React.ReactNode
  /** Fila de datos secundarios bajo la descripción (fecha, duración). */
  meta?: React.ReactNode
  footer?: React.ReactNode
  /** Etiquetas (stack, categorías) bajo la descripción. */
  tags?: string[]
  /** Botones o enlaces de acción dentro del cuerpo (sin separador). */
  actions?: React.ReactNode
  /** Con href toda la tarjeta es clicable (enlace en el título, extendido con ::after). */
  href?: string
  linkComponent?: React.ElementType
  /** Borde que se ilumina con el cursor. */
  spotlight?: boolean
  layout?: "vertical" | "horizontal" | "overlay" | "inset"
  aspect?: keyof typeof ASPECTS
  className?: string
}

function MediaCard({
  image,
  imageAlt = "",
  title,
  description,
  eyebrow,
  badge,
  meta,
  footer,
  tags,
  actions,
  href,
  linkComponent: Link = "a",
  spotlight = true,
  layout = "vertical",
  aspect = "video",
  className,
}: MediaCardProps) {
  const titleNode = href ? (
    <Link href={href} className="outline-none after:absolute after:inset-0 after:content-['']">
      {title}
    </Link>
  ) : (
    title
  )

  if (layout === "overlay") {
    return (
      <Card
        padding="none"
        interactive={!!href} spotlight={spotlight}
        className={cn("group relative isolate text-white", ASPECTS[aspect], className)}
      >
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        {badge ? <div className="absolute left-3 top-3">{badge}</div> : null}
        <div className="mt-auto grid gap-1 p-5">
          {eyebrow ? <div className="text-xs font-medium uppercase tracking-wide text-white/80">{eyebrow}</div> : null}
          <h3 className="font-display text-lg font-bold leading-tight">{titleNode}</h3>
          {description ? <div className="text-sm text-white/85">{description}</div> : null}
          {meta ? <div className="text-xs text-white/75">{meta}</div> : null}
        </div>
      </Card>
    )
  }

  if (layout === "inset") {
    return (
      <Card padding="none" variant="solid" interactive={!!href} spotlight={spotlight} className={cn("group relative gap-2.5 px-3.5 pb-4 pt-3", className)}>
        <img src={image} alt={imageAlt} loading="lazy" className="h-[150px] w-full rounded-md bg-surface-2 object-cover" />
        <h3 className="font-display text-[1.2rem] font-semibold tracking-[-.01em] text-foreground">{titleNode}</h3>
        {description ? <p className="flex-1 text-[.9rem] text-foreground/90">{description}</p> : null}
        {tags && tags.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <li key={t}>
                <Badge variant="tag" className="px-2.5 py-0.5">{t}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
        {actions ? <div className="relative z-10 flex flex-wrap items-center gap-3">{actions}</div> : null}
      </Card>
    )
  }

  const horizontal = layout === "horizontal"
  return (
    <Card
      padding="none"
      interactive={!!href} spotlight={spotlight}
      className={cn("group relative", horizontal && "sm:flex-row", className)}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-surface-2",
          horizontal ? "aspect-video sm:aspect-auto sm:w-2/5" : ASPECTS[aspect],
        )}
      >
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badge ? <div className="absolute left-3 top-3">{badge}</div> : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="grid flex-1 content-start gap-1.5 p-5">
          {eyebrow ? <div className="text-xs font-medium uppercase tracking-wide text-primary-text">{eyebrow}</div> : null}
          <h3 className="font-display text-lg font-bold leading-tight text-foreground">{titleNode}</h3>
          {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
          {meta ? <div className="mt-1 text-xs text-muted-foreground">{meta}</div> : null}
          {tags && tags.length > 0 ? (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <li key={t}>
                  <Badge variant="tag" className="px-2.5 py-0.5">{t}</Badge>
                </li>
              ))}
            </ul>
          ) : null}
          {actions ? <div className="relative z-10 mt-3 flex flex-wrap items-center gap-3">{actions}</div> : null}
        </div>
        {footer ? <div className="relative z-10 flex items-center gap-2 border-t border-border px-5 py-3">{footer}</div> : null}
      </div>
    </Card>
  )
}

function MediaCardSkeleton({ layout = "vertical", aspect = "video", className }: Pick<MediaCardProps, "layout" | "aspect" | "className">) {
  const horizontal = layout === "horizontal"
  return (
    <Card padding="none" aria-hidden className={cn(horizontal && "sm:flex-row", className)}>
      <Skeleton
        className={cn("rounded-none", layout === "overlay" ? ASPECTS[aspect] : horizontal ? "aspect-video sm:aspect-auto sm:w-2/5" : cn("w-full", ASPECTS[aspect]))}
      />
      {layout === "overlay" ? null : (
        <div className="grid flex-1 content-start gap-2 p-5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      )}
    </Card>
  )
}

export { MediaCard, MediaCardSkeleton }
