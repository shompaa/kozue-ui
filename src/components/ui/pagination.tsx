"use client"

import * as React from "react"
import { CaretLeft, CaretRight, DotsThree } from "@phosphor-icons/react/ssr"
import { cn } from "cn"
import { useMessages } from "../../i18n"
import { Button } from "./button"

export type PageItem = number | "ellipsis-start" | "ellipsis-end"

/** Calcula los items visibles: siempre primera, última y `siblings` alrededor de la actual. */
export function getPageRange(page: number, pageCount: number, siblings = 1): PageItem[] {
  const total = Math.max(0, Math.floor(pageCount))
  const slots = siblings * 2 + 5
  if (total <= slots) return Array.from({ length: total }, (_, i) => i + 1)

  const current = Math.min(Math.max(page, 1), total)
  const left = Math.max(current - siblings, 1)
  const right = Math.min(current + siblings, total)
  const showStartDots = left > 2
  const showEndDots = right < total - 1

  if (!showStartDots && showEndDots) {
    const count = siblings * 2 + 3
    return [...Array.from({ length: count }, (_, i) => i + 1), "ellipsis-end", total]
  }
  if (showStartDots && !showEndDots) {
    const count = siblings * 2 + 3
    return [1, "ellipsis-start", ...Array.from({ length: count }, (_, i) => total - count + 1 + i)]
  }
  return [1, "ellipsis-start", ...Array.from({ length: right - left + 1 }, (_, i) => left + i), "ellipsis-end", total]
}

export interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  siblings?: number
  className?: string
}

function Pagination({ page, pageCount, onPageChange, siblings = 1, className }: PaginationProps) {
  const m = useMessages().pagination
  if (pageCount <= 1) return null
  const items = getPageRange(page, pageCount, siblings)
  return (
    <nav role="navigation" aria-label={m.nav} className={cn("flex items-center gap-1", className)}>
      <Button variant="ghost" size="icon" aria-label={m.previous} disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        <CaretLeft aria-hidden />
      </Button>
      {items.map((item) =>
        typeof item === "number" ? (
          <Button
            key={item}
            variant={item === page ? "default" : "ghost"}
            size="icon"
            aria-label={m.goTo(item)}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        ) : (
          <span key={item} aria-hidden className="grid size-9 place-items-center text-muted-foreground">
            <DotsThree />
          </span>
        ),
      )}
      <Button variant="ghost" size="icon" aria-label={m.next} disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
        <CaretRight aria-hidden />
      </Button>
    </nav>
  )
}

export { Pagination }
