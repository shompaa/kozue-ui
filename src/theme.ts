"use client"

import * as React from "react"

export const themes = ["light", "dark", "paper"] as const
export type ThemeName = (typeof themes)[number]

const KEY = "kozue-theme"
const isTheme = (v: unknown): v is ThemeName => (themes as readonly unknown[]).includes(v)

function apply(theme: ThemeName) {
  const el = document.documentElement
  for (const t of themes) el.classList.remove(t)
  el.classList.add(theme)
}

/** Script para el <head>: aplica el tema guardado antes del primer pintado y evita el parpadeo. */
export const themeInitScript = `try{var t=localStorage.getItem("${KEY}");if(["light","dark","paper"].indexOf(t)>-1)document.documentElement.classList.add(t)}catch(e){}`

/** Tema persistido en localStorage y aplicado como clase en <html>. Sin dependencias. */
export function useKozueTheme(initial: ThemeName = "dark") {
  const [theme, set] = React.useState<ThemeName>(initial)

  React.useEffect(() => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem(KEY)
    } catch {}
    if (isTheme(saved)) {
      set(saved)
      apply(saved)
    }
  }, [])

  const setTheme = React.useCallback((next: ThemeName) => {
    set(next)
    apply(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {}
  }, [])

  return [theme, setTheme] as const
}
