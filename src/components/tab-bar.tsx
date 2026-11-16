import * as React from "react"
import type { Icon } from "@phosphor-icons/react"
import { cn } from "cn"
import { useMessages } from "../i18n"

interface TabBarItemBase {
  label: string
  icon: Icon
  active?: boolean
  disabled?: boolean
  expanded?: boolean
}

export type TabBarItem =
  | (TabBarItemBase & { href: string; onClick?: undefined })
  | (TabBarItemBase & { href?: string; onClick: () => void })

export interface TabBarProps {
  items: TabBarItem[]
  linkComponent?: React.ElementType
  className?: string
}

export function TabBar({ items, linkComponent: Link = "a", className }: TabBarProps) {
  const m = useMessages().tabBar
  return (
    <nav
      aria-label={m.nav}
      className={cn(
        "flex items-stretch border-t border-border bg-card",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = item.icon
        const inner = (
          <>
            <Icon className="size-5" aria-hidden />
            <span>{item.label}</span>
          </>
        )
        const cls = cn(
          "flex flex-1 flex-col items-center min-h-11 gap-1 py-2 text-[11px] font-medium transition-colors",
          item.active ? "bg-surface-2 font-semibold text-highlight-text" : "text-muted-foreground",
          item.disabled && "pointer-events-none opacity-40",
        )
        if (item.onClick && !item.disabled) {
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              aria-haspopup="dialog"
              aria-expanded={item.expanded}
              className={cls}
            >
              {inner}
            </button>
          )
        }
        return item.disabled ? (
          <span key={item.label} className={cls} aria-disabled="true">
            {inner}
          </span>
        ) : (
          <Link
            key={item.label}
            href={item.href ?? "#"}
            className={cls}
            aria-current={item.active ? "page" : undefined}
          >
            {inner}
          </Link>
        )
      })}
    </nav>
  )
}
