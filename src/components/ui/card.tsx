"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { initSpotlight } from "../../spotlight"

const cardVariants = cva("flex flex-col rounded-xl text-card-foreground transition-[transform,box-shadow]", {
  variants: {
    variant: {
      default: "border bg-card shadow-sm",
      outline: "border bg-transparent",
      elevated: "bg-card shadow-lg",
      ghost: "bg-transparent",
      solid: "border bg-card",
      glow: "border border-highlight/55 bg-gradient-to-br from-highlight/30 to-primary/15 shadow-[0_0_24px] shadow-highlight/20 ring-1 ring-inset ring-white/5",
    },
    padding: {
      default: "gap-6 py-6",
      none: "gap-0 overflow-hidden py-0",
    },
    interactive: {
      true: "cursor-pointer motion-safe:hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-14px] hover:shadow-highlight/45 focus-within:ring-[3px] focus-within:ring-ring/50",
      false: "",
    },
  },
  defaultVariants: { variant: "default", padding: "default", interactive: false },
})

export interface CardProps extends React.ComponentProps<"div">, VariantProps<typeof cardVariants> {
  /** Borde que se ilumina siguiendo el cursor. */
  spotlight?: boolean
}

function Card({ className, variant, padding, interactive, spotlight, ...props }: CardProps) {
  React.useEffect(() => {
    if (spotlight) initSpotlight()
  }, [spotlight])
  return <div data-slot="card" data-spotlight={spotlight ? "" : undefined} className={cn(cardVariants({ variant, padding, interactive }), className)} {...props} />
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
