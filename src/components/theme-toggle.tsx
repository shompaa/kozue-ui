"use client"

import { Moon, NotePencil, Sun } from "@phosphor-icons/react"
import * as React from "react"
import { useMessages } from "../i18n"
import { themes, useKozueTheme, type ThemeName } from "../theme"
import { Button } from "./ui/button"

const ICONS: Record<ThemeName, typeof Moon> = { dark: Moon, light: Sun, paper: NotePencil }

export interface ThemeToggleProps {
  /** Tema actual. Si no se pasa, el componente maneja su propio estado (localStorage + clase en <html>). */
  theme?: ThemeName
  onThemeChange?: (theme: ThemeName) => void
  showLabel?: boolean
  compact?: boolean
  className?: string
}

export function ThemeToggle({ theme, onThemeChange, showLabel = false, compact = false, className }: ThemeToggleProps) {
  const m = useMessages().themeToggle
  const [ownTheme, setOwnTheme] = useKozueTheme()
  const current = theme ?? ownTheme
  const setTheme = onThemeChange ?? setOwnTheme
  const next = themes[(themes.indexOf(current) + 1) % themes.length]
  const Icon = ICONS[current]
  const label = m[current]
  const switchLabel = m.switchTo(label, m[next])
  if (showLabel) {
    return (
      <button type="button" className={className} onClick={() => setTheme(next)} title={label} aria-label={switchLabel}>
        <Icon className="size-4" aria-hidden />
        <span className={compact ? "sr-only" : undefined}>{label}</span>
      </button>
    )
  }
  return (
    <Button type="button" variant="ghost" size="icon" className={className} onClick={() => setTheme(next)} title={label} aria-label={switchLabel}>
      <Icon className="size-4" aria-hidden />
    </Button>
  )
}
