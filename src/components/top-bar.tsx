import * as React from "react"
import { Bell, MagnifyingGlass } from "@phosphor-icons/react/ssr"
import { cn } from "cn"
import { useMessages } from "../i18n"
import { Input } from "./ui/input"
import { ThemeToggle } from "./theme-toggle"

export interface TopBarProps {
  date?: string
  /** Destino del formulario de búsqueda (GET, parámetro `q`). */
  searchAction?: string
  hideSearch?: boolean
  themeToggle?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function TopBar({ date, searchAction = "/search", hideSearch = false, themeToggle = <ThemeToggle />, actions, className }: TopBarProps) {
  const m = useMessages()
  return (
    <header
      className={cn(
        "flex items-center gap-4 border-b border-border bg-card px-4 py-3",
        className,
      )}
    >
      {hideSearch ? null : <form action={searchAction} method="get" role="search" className="relative w-full max-w-sm">
        <MagnifyingGlass
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          name="q"
          type="search"
          aria-label={m.common.search}
          placeholder={m.topBar.searchPlaceholder}
          className="pl-9"
        />
      </form>}
      <div className="ml-auto flex items-center gap-2">
        {date ? (
          <span className="hidden text-xs text-muted-foreground sm:inline">{date}</span>
        ) : null}
        <button
          type="button"
          aria-label={m.topBar.notifications}
          className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Bell className="size-4" aria-hidden />
        </button>
        {themeToggle}
        {actions}
      </div>
    </header>
  )
}
