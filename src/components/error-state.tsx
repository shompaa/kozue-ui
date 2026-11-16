import { cn } from "cn"
import { useMessages } from "../i18n"
import { Button } from "./ui/button"
import { Text } from "./text"

export interface ErrorStateProps {
  message?: string
  retryLabel?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({ message, retryLabel, onRetry, className }: ErrorStateProps) {
  const m = useMessages()
  return (
    <div role="alert" className={cn("flex flex-col items-start gap-3 rounded-card border border-border bg-card p-6", className)}>
      <Text>{message ?? m.errorState.message}</Text>
      {onRetry ? <Button variant="secondary" onClick={onRetry}>{retryLabel ?? m.common.retry}</Button> : null}
    </div>
  )
}
