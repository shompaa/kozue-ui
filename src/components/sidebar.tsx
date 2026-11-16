"use client"

import * as React from "react"
import { CaretLeft } from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"
import { cn } from "cn"
import { useMessages } from "../i18n"

export interface SidebarItem {
  label: string
  href: string
  icon: Icon
  active?: boolean
  disabled?: boolean
}

export interface SidebarProps {
  items: SidebarItem[]
  brand?: string
  tagline?: string
  logo?: React.ReactNode
  compactLogo?: React.ReactNode
  user?: { name: string; role?: string }
  footer?: React.ReactNode
  collapsed?: boolean
  onToggleCollapse?: () => void
  linkComponent?: React.ElementType
  className?: string
}

export function Sidebar({
  items,
  brand = "Kozue",
  tagline,
  logo,
  compactLogo,
  user,
  footer,
  collapsed = false,
  onToggleCollapse,
  linkComponent: Link = "a",
  className,
}: SidebarProps) {
  const m = useMessages().sidebar
  const marca = collapsed ? compactLogo : logo
  return (
    <aside
      className={cn(
        "flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-3 transition-[width] duration-200",
        collapsed ? "w-[4.6rem]" : "w-56",
        className,
      )}
    >
      <div className={cn("flex items-center gap-2.5 px-1.5 pt-1", collapsed && "justify-center px-0")}>
        {marca ? (
          collapsed ? marca : (
            <span className="flex min-w-0 flex-col gap-1">
              {marca}
              {tagline ? <span className="truncate text-[0.6rem] uppercase tracking-wider text-muted-foreground">{tagline}</span> : null}
            </span>
          )
        ) : (
        <>
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary font-display text-sm text-primary-foreground"
        >
          {brand.charAt(0).toUpperCase()}
        </span>
        {collapsed ? null : (
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-display text-lg tracking-tight">{brand}</span>
            {tagline ? <span className="truncate text-[0.6rem] uppercase tracking-wider text-muted-foreground">{tagline}</span> : null}
          </span>
        )}
        </>
        )}
      </div>

      {onToggleCollapse ? (
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? m.expand : m.collapse}
          title={collapsed ? m.expand : m.collapse}
          className="ml-auto grid size-11 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground data-[c=true]:mx-auto"
          data-c={collapsed}
        >
          <CaretLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} aria-hidden />
        </button>
      ) : null}

      <nav className="flex flex-1 flex-col gap-1" aria-label={m.nav}>
        {items.map((item) => {
          const Icon = item.icon
          const inner = (
            <>
              <Icon className="size-[1.1rem] shrink-0" aria-hidden />
              {collapsed ? <span className="sr-only">{item.label}</span> : <span>{item.label}</span>}
            </>
          )
          const cls = cn(
            "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-all active:scale-[0.98] motion-reduce:active:scale-100",
            collapsed && "justify-center px-0",
            item.active
              ? "bg-primary text-primary-foreground shadow-[0_0_0_1px_var(--primary),0_0_20px_-4px_color-mix(in_srgb,var(--primary)_55%,transparent)]"
              : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
            item.disabled && "pointer-events-none opacity-40",
          )
          return item.disabled ? (
            <span key={item.label} className={cls} aria-disabled="true">
              {inner}
            </span>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cls}
              aria-current={item.active ? "page" : undefined}
            >
              {inner}
            </Link>
          )
        })}
      </nav>

      <div className="flex flex-col gap-2 border-t border-border pt-3">
        {footer}
        {user ? (
          <div
            className={cn(
              "flex items-center gap-2.5 rounded-2xl border border-border bg-background/60 p-2.5 text-sm",
              collapsed && "justify-center p-2",
            )}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-highlight font-semibold text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </span>
            {collapsed ? null : (
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-xs font-semibold">{user.name}</span>
                {user.role ? <span className="text-[0.65rem] text-muted-foreground">{user.role}</span> : null}
              </span>
            )}
          </div>
        ) : null}
      </div>
    </aside>
  )
}
