import * as React from "react"
import { CircleNotch } from "@phosphor-icons/react/ssr"
import { cn } from "cn"
import { useMessages } from "../../i18n"

function Spinner({ className, label, ...props }: React.ComponentProps<"span"> & { label?: string }) {
  const m = useMessages().common
  return (
    <span role="status" data-slot="spinner" className={cn("inline-flex", className)} {...props}>
      <CircleNotch className="size-5 animate-spin text-primary-text" aria-hidden />
      <span className="sr-only">{label ?? m.loading}</span>
    </span>
  )
}

export { Spinner }
