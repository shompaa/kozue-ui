import * as React from "react"
import { cn } from "cn"
import { Heading, Text } from "./text"

export interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-start gap-2 rounded-card border border-dashed border-border p-6", className)}>
      {icon ? <div aria-hidden className="text-primary-text">{icon}</div> : null}
      <Heading as="h3" size="sm">{title}</Heading>
      {description ? <Text tone="muted">{description}</Text> : null}
      {action}
    </div>
  )
}
