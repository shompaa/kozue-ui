import { cn } from "cn"
import { useMessages } from "../i18n"

export type SaveState = "idle" | "saving" | "saved" | "error"

export interface SaveStatusProps {
  state: SaveState
  savedAt?: string
  errorText?: string
  className?: string
}

export function SaveStatus({ state, savedAt, errorText, className }: SaveStatusProps) {
  const m = useMessages().saveStatus
  const text = state === "error" ? (errorText ?? m.error) : state === "idle" ? "" : m[state]
  return (
    <p role="status" aria-live="polite" className={cn("text-xs text-muted-foreground", state === "saved" && "text-success", className)}>
      {text}
      {state === "saved" && savedAt ? ` · ${savedAt}` : ""}
    </p>
  )
}
