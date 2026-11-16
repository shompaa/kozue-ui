import * as React from "react"
import { CaretRight } from "@phosphor-icons/react/ssr"
import { cn } from "cn"
import { useMessages } from "../../i18n"

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  linkComponent?: React.ElementType
  className?: string
}

/** El último item es la página actual (sin enlace). */
function Breadcrumb({ items, linkComponent: Link = "a", className }: BreadcrumbProps) {
  const m = useMessages().breadcrumb
  return (
    <nav aria-label={m.nav} className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5">
              {last || !item.href ? (
                <span aria-current={last ? "page" : undefined} className={cn(last && "font-medium text-foreground")}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              )}
              {last ? null : <CaretRight className="size-3.5" aria-hidden />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumb }
