import * as React from "react"
import { ArrowDownRight, ArrowUpRight } from "@phosphor-icons/react/ssr"
import type { Icon } from "@phosphor-icons/react"
import { cn } from "cn"
import { useMessages } from "../i18n"
import { Card } from "./ui/card"
import { Sparkline } from "./sparkline"

const ACENTOS = {
  primary: { circulo: "bg-primary", brillo: "var(--primary)", texto: "text-primary-text" },
  highlight: { circulo: "bg-highlight", brillo: "var(--highlight)", texto: "text-highlight-text" },
} as const

export interface StatCardProps {
  label: string
  value: React.ReactNode
  delta?: number
  hint?: string
  icon?: Icon
  trend?: number[]
  acento?: keyof typeof ACENTOS
  className?: string
}

export function StatCard({ label, value, delta, hint, icon: Icon, trend, acento, className }: StatCardProps) {
  const m = useMessages().statCard
  const hasDelta = typeof delta === "number"
  const up = (delta ?? 0) >= 0
  const a = acento ? ACENTOS[acento] : null
  return (
    <Card className={cn("relative min-h-28 border border-border bg-card flex-row items-start gap-3 overflow-hidden rounded-2xl p-4", className)}>
      {a ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-3 -right-3 h-[70px] w-[100px] opacity-[.08] dark:opacity-[.14]"
          style={{ background: `radial-gradient(closest-side, ${a.brillo}, transparent)` }}
        />
      ) : null}
      {Icon ? (
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-full text-primary-foreground", a?.circulo ?? "bg-primary")}>
          <Icon className="size-[1.1rem]" aria-hidden />
        </span>
      ) : null}
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="font-display text-3xl leading-none tabular-nums">{value}</span>
        {hasDelta ? (
          <span className={cn("mt-1 inline-flex items-center gap-1 text-xs font-medium tabular-nums", up ? "text-success" : "text-warning")}>
            {up ? <ArrowUpRight className="size-3.5" aria-hidden /> : <ArrowDownRight className="size-3.5" aria-hidden />}
            {up ? "+" : ""}
            {delta}%
            <span className="text-muted-foreground">{hint ?? "vs. 30 días previos"}</span>
          </span>
        ) : hint ? (
          <span className="mt-1 text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </div>
      {trend && trend.length > 1 ? (
        <Sparkline
          data={trend}
          height={32}
          className={cn("absolute bottom-2.5 right-3 h-8 w-20 opacity-90", a?.texto ?? "text-primary-text")}
          label={m.trend(label)}
        />
      ) : null}
    </Card>
  )
}
