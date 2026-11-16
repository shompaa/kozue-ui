import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckCircle, Info, Warning, WarningOctagon, X } from "@phosphor-icons/react/ssr"
import { cn } from "cn"
import { useMessages } from "../../i18n"

const alertVariants = cva("relative flex w-full items-start gap-3 rounded-lg border p-4 text-sm", {
  variants: {
    variant: {
      info: "border-info/40 bg-info/10 text-foreground [&_[data-slot=alert-icon]]:text-info",
      success: "border-success/40 bg-success/10 text-foreground [&_[data-slot=alert-icon]]:text-success",
      warning: "border-warning/40 bg-warning/10 text-foreground [&_[data-slot=alert-icon]]:text-warning",
      danger: "border-danger/40 bg-danger/10 text-foreground [&_[data-slot=alert-icon]]:text-danger",
    },
  },
  defaultVariants: { variant: "info" },
})

const ICONS = { info: Info, success: CheckCircle, warning: Warning, danger: WarningOctagon } as const

export interface AlertProps extends Omit<React.ComponentProps<"div">, "title">, VariantProps<typeof alertVariants> {
  onDismiss?: () => void
}

function Alert({ className, variant = "info", onDismiss, children, ...props }: AlertProps) {
  const m = useMessages().common
  const Icon = ICONS[variant ?? "info"]
  return (
    <div
      role={variant === "danger" || variant === "warning" ? "alert" : "status"}
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon data-slot="alert-icon" className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div className="grid flex-1 gap-1">{children}</div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={m.dismiss}
          className="-m-1 grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <X className="size-4" aria-hidden />
        </button>
      ) : null}
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="alert-title" className={cn("font-semibold leading-tight", className)} {...props} />
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn("text-muted-foreground", className)} {...props} />
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
