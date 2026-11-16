"use client"

import * as React from "react"

export interface Messages {
  common: { close: string; cancel: string; confirm: string; search: string; retry: string; loading: string; dismiss: string }
  pagination: { nav: string; previous: string; next: string; goTo: (page: number) => string }
  breadcrumb: { nav: string }
  dataTable: { empty: string }
  imageUploader: { upload: string; remove: string; invalidFormat: string; tooLarge: (maxMb: number) => string; hint: (maxMb: number) => string }
  sidebar: { expand: string; collapse: string; nav: string }
  sparkline: { trend: (from: number, to: number) => string }
  statCard: { trend: (label: string) => string }
  tabBar: { nav: string }
  themeToggle: { dark: string; light: string; paper: string; switchTo: (current: string, next: string) => string }
  topBar: { searchPlaceholder: string; notifications: string }
  errorState: { message: string }
  confirmDialog: { typeToConfirm: (text: string) => string }
  saveStatus: { saving: string; saved: string; error: string }
  progressBar: { label: string; empty: string; valueText: (done: number, total: number, unit?: string) => string }
}

export const en: Messages = {
  common: { close: "Close", cancel: "Cancel", confirm: "Confirm", search: "Search", retry: "Try again", loading: "Loading", dismiss: "Dismiss" },
  pagination: { nav: "Pagination", previous: "Previous page", next: "Next page", goTo: (page) => `Page ${page}` },
  breadcrumb: { nav: "Breadcrumb" },
  dataTable: { empty: "No results" },
  imageUploader: {
    upload: "Upload image",
    remove: "Remove image",
    invalidFormat: "Format not allowed. Use JPG, PNG or WebP.",
    tooLarge: (maxMb) => `The image exceeds ${maxMb} MB.`,
    hint: (maxMb) => `JPG, PNG, WebP · max ${maxMb} MB`,
  },
  sidebar: { expand: "Expand menu", collapse: "Collapse menu", nav: "Main navigation" },
  sparkline: { trend: (from, to) => `Trend from ${from} to ${to}` },
  statCard: { trend: (label) => `${label} trend` },
  tabBar: { nav: "Navigation" },
  themeToggle: {
    dark: "Dark theme",
    light: "Light theme",
    paper: "Paper theme",
    switchTo: (current, next) => `${current}. Switch to ${next.toLowerCase()}`,
  },
  topBar: { searchPlaceholder: "Search…", notifications: "Notifications" },
  errorState: { message: "We could not load this. Please try again." },
  confirmDialog: { typeToConfirm: (text) => `Type ${text} to continue` },
  saveStatus: { saving: "Saving…", saved: "Saved", error: "Could not save; retrying" },
  progressBar: {
    label: "Progress",
    empty: "Nothing to show",
    valueText: (done, total, unit) => `${done} of ${total}${unit ? ` ${unit}` : ""}`,
  },
}

export const es: Messages = {
  common: { close: "Cerrar", cancel: "Cancelar", confirm: "Confirmar", search: "Buscar", retry: "Reintentar", loading: "Cargando", dismiss: "Descartar" },
  pagination: { nav: "Paginación", previous: "Página anterior", next: "Página siguiente", goTo: (page) => `Página ${page}` },
  breadcrumb: { nav: "Ruta de navegación" },
  dataTable: { empty: "Sin resultados" },
  imageUploader: {
    upload: "Subir imagen",
    remove: "Quitar imagen",
    invalidFormat: "Formato no permitido. Usa JPG, PNG o WebP.",
    tooLarge: (maxMb) => `La imagen supera ${maxMb} MB.`,
    hint: (maxMb) => `JPG, PNG, WebP · máx ${maxMb} MB`,
  },
  sidebar: { expand: "Expandir menú", collapse: "Contraer menú", nav: "Navegación principal" },
  sparkline: { trend: (from, to) => `Tendencia de ${from} a ${to}` },
  statCard: { trend: (label) => `Tendencia de ${label}` },
  tabBar: { nav: "Navegación" },
  themeToggle: {
    dark: "Tema oscuro",
    light: "Tema claro",
    paper: "Tema papel",
    switchTo: (current, next) => `${current}. Cambiar a ${next.toLowerCase()}`,
  },
  topBar: { searchPlaceholder: "Buscar…", notifications: "Notificaciones" },
  errorState: { message: "No pudimos cargar esto. Puedes intentarlo de nuevo." },
  confirmDialog: { typeToConfirm: (text) => `Escribe ${text} para continuar` },
  saveStatus: { saving: "Guardando…", saved: "Guardado", error: "No se pudo guardar; reintentando" },
  progressBar: {
    label: "Progreso",
    empty: "Nada que mostrar",
    valueText: (done, total, unit) => `${done} de ${total}${unit ? ` ${unit}` : ""}`,
  },
}

export type MessageOverrides = { [K in keyof Messages]?: Partial<Messages[K]> }

const Ctx = React.createContext<Messages>(en)

export function KozueProvider({
  messages = en,
  overrides,
  children,
}: {
  messages?: Messages
  overrides?: MessageOverrides
  children: React.ReactNode
}) {
  const value = React.useMemo(() => {
    if (!overrides) return messages
    const merged = { ...messages } as Record<string, unknown>
    for (const k of Object.keys(overrides) as (keyof Messages)[]) {
      merged[k] = { ...messages[k], ...overrides[k] }
    }
    return merged as unknown as Messages
  }, [messages, overrides])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useMessages = () => React.useContext(Ctx)
