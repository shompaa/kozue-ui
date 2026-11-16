import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Heading, Text } from "@/components/text"

interface Swatch {
  token: string
  utility: string
  swatch: string
  /** Variable del color de texto con el que se usa encima, para medir contraste. */
  on?: string
}

const GROUPS: { title: string; items: Swatch[] }[] = [
  {
    title: "Base",
    items: [
      { token: "--bg", utility: "bg-background", swatch: "bg-background", on: "--fg" },
      { token: "--surface", utility: "bg-card", swatch: "bg-card", on: "--fg" },
      { token: "--surface-2", utility: "bg-surface-2", swatch: "bg-surface-2", on: "--fg" },
      { token: "--border", utility: "border-border", swatch: "bg-border" },
      { token: "--outline", utility: "border-input", swatch: "bg-input" },
      { token: "--fg", utility: "text-foreground", swatch: "bg-foreground", on: "--bg" },
      { token: "--fg-muted", utility: "text-muted-foreground", swatch: "bg-muted-foreground", on: "--bg" },
    ],
  },
  {
    title: "Marca",
    items: [
      { token: "--primary", utility: "bg-primary", swatch: "bg-primary", on: "--primary-foreground" },
      { token: "--primary-foreground", utility: "text-primary-foreground", swatch: "bg-primary-foreground", on: "--primary" },
      { token: "--primary-text", utility: "text-primary-text", swatch: "bg-primary-text", on: "--bg" },
      { token: "--highlight", utility: "bg-highlight", swatch: "bg-highlight", on: "--primary-foreground" },
      { token: "--highlight-text", utility: "text-highlight-text", swatch: "bg-highlight-text", on: "--bg" },
      { token: "--tertiary", utility: "bg-tertiary", swatch: "bg-tertiary", on: "--primary-foreground" },
    ],
  },
  {
    title: "Estado",
    items: [
      { token: "--success", utility: "text-success", swatch: "bg-success", on: "--bg" },
      { token: "--warning", utility: "text-warning", swatch: "bg-warning", on: "--bg" },
      { token: "--danger", utility: "text-danger", swatch: "bg-danger", on: "--bg" },
      { token: "--info", utility: "text-info", swatch: "bg-info", on: "--bg" },
    ],
  },
]

const ALL = GROUPS.flatMap((g) => g.items.map((i) => i.token))

function toRgb(value: string): [number, number, number] | null {
  const v = value.trim()
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(v)
  if (!hex) return null
  const h = hex[1].length === 3 ? hex[1].replace(/./g, (c) => c + c) : hex[1]
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number]
}

function luminance([r, g, b]: [number, number, number]) {
  const f = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

function contrast(a: string, b: string): number | null {
  const ca = toRgb(a)
  const cb = toRgb(b)
  if (!ca || !cb) return null
  const [hi, lo] = [luminance(ca), luminance(cb)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

function useResolved(names: string[]) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [values, setValues] = React.useState<Record<string, string>>({})
  React.useLayoutEffect(() => {
    if (!ref.current) return
    const cs = getComputedStyle(ref.current)
    const next = Object.fromEntries(names.map((n) => [n, cs.getPropertyValue(n).trim()]))
    setValues((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next))
  })
  return { ref, values }
}

function Ratio({ ratio }: { ratio: number | null }) {
  if (ratio === null) return <span className="text-muted-foreground">—</span>
  const aa = ratio >= 4.5
  return (
    <span className={aa ? "text-success" : "text-warning"}>
      {ratio.toFixed(1)}:1 {aa ? "AA" : "bajo AA"}
    </span>
  )
}

function TokensPage() {
  const { ref, values } = useResolved(ALL)
  return (
    <div ref={ref} className="grid gap-8 bg-background p-8 text-foreground">
      <div className="grid gap-1">
        <Heading as="h1" size="xl">Tokens</Heading>
        <Text tone="muted">
          Valores resueltos del tema activo. Cambia de tema con el selector de la barra superior. Contraste medido contra el color con que se usa encima (AA = 4.5:1).
        </Text>
      </div>

      {GROUPS.map((group) => (
        <section key={group.title} className="grid gap-3">
          <Heading as="h2" size="md">{group.title}</Heading>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
            {group.items.map((item) => (
              <div key={item.token} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                <div className={`size-12 shrink-0 rounded-md border border-border ${item.swatch}`} />
                <div className="min-w-0 text-xs">
                  <div className="font-semibold text-foreground">{item.token}</div>
                  <div className="text-muted-foreground">
                    <code>{item.utility}</code>
                  </div>
                  <div className="tabular-nums text-muted-foreground">
                    {values[item.token] || "—"}
                    {item.on ? (
                      <>
                        {" · "}
                        <Ratio ratio={contrast(values[item.token] ?? "", values[item.on] ?? "")} />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="grid gap-3">
        <Heading as="h2" size="md">Tipografía</Heading>
        <div className="grid gap-2 rounded-lg border border-border bg-card p-4">
          <Heading as="h1" size="xl">Heading xl</Heading>
          <Heading as="h2" size="lg">Heading lg</Heading>
          <Heading as="h3" size="md">Heading md</Heading>
          <Heading as="h4" size="sm">Heading sm</Heading>
          <Text size="lg">Text lg: párrafo de lectura principal.</Text>
          <Text>Text md: texto de interfaz por defecto.</Text>
          <Text size="sm" tone="muted">Text sm muted: ayudas y metadatos.</Text>
          <p className="font-hand text-3xl text-highlight-text">font-hand: acentos manuscritos</p>
        </div>
      </section>

      <section className="grid gap-3">
        <Heading as="h2" size="md">Radios</Heading>
        <div className="flex flex-wrap gap-3">
          {[
            ["rounded-sm", "sm"],
            ["rounded-md", "md"],
            ["rounded-lg", "lg"],
            ["rounded-xl", "xl"],
            ["rounded-card", "card"],
            ["rounded-full", "full"],
          ].map(([cls, name]) => (
            <div key={name} className="grid justify-items-center gap-1 text-xs text-muted-foreground">
              <div className={`h-14 w-20 border border-border bg-surface-2 ${cls}`} />
              {name}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const meta: Meta = {
  title: "Design System/Tokens",
  parameters: { layout: "fullscreen" },
}
export default meta

export const Tokens: StoryObj = { render: () => <TokensPage /> }
