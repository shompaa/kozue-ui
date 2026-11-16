import type { Meta, StoryObj } from "@storybook/react"
import { Eye, Heart } from "@phosphor-icons/react"
import { MediaCard, MediaCardSkeleton } from "@/components/media-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { art } from "./_mock"

const meta: Meta<typeof MediaCard> = {
  title: "Composición/Card con imagen",
  component: MediaCard,
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj<typeof MediaCard>

const base = {
  image: art("#6d5bd0", "#2b1f5c", "Kozue UI"),
  imageAlt: "Portada del proyecto",
  title: "Kozue UI",
  description: "Design system en React y Tailwind con 3 temas y textos traducibles.",
  eyebrow: "Librería",
} as const

export const Vertical: Story = {
  args: { ...base, badge: <Badge variant="success">Publicado</Badge>, meta: "Actualizado hace 2 días", href: "#" },
  render: (args) => <div className="max-w-sm"><MediaCard {...args} /></div>,
}

export const Horizontal: Story = {
  args: { ...base, layout: "horizontal", image: art("#0e7490", "#164e63", "Reservas"), title: "Reservas de canchas", eyebrow: "SaaS", href: "#" },
  render: (args) => <div className="max-w-2xl"><MediaCard {...args} /></div>,
}

export const Overlay: Story = {
  args: { ...base, layout: "overlay", aspect: "square", image: art("#be185d", "#4c0519", "Laboratorio"), title: "Laboratorio", eyebrow: "Salud", badge: <Badge variant="info">Beta</Badge>, href: "#" },
  render: (args) => <div className="max-w-sm"><MediaCard {...args} /></div>,
}

export const WithFooterActions: Story = {
  args: {
    ...base,
    footer: (
      <>
        <Button size="sm" variant="ghost"><Heart /> 124</Button>
        <Button size="sm" variant="ghost"><Eye /> 1.2k</Button>
        <Button size="sm" className="ml-auto">Ver</Button>
      </>
    ),
  },
  render: (args) => <div className="max-w-sm"><MediaCard {...args} /></div>,
}

export const Aspects: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {(["video", "square", "wide", "portrait"] as const).map((aspect, i) => (
        <MediaCard
          key={aspect}
          aspect={aspect}
          image={art(["#6d5bd0", "#0e7490", "#be185d", "#15803d"][i], "#111827", aspect)}
          title={`aspect="${aspect}"`}
          description="Proporción de la imagen"
        />
      ))}
    </div>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
      <MediaCard {...base} href="#" badge={<Badge variant="success">Publicado</Badge>} />
      <MediaCard {...base} image={art("#0e7490", "#164e63", "Reservas")} title="Reservas de canchas" eyebrow="SaaS" href="#" />
      <MediaCard {...base} image={art("#be185d", "#4c0519", "Laboratorio")} title="Laboratorio" eyebrow="Salud" href="#" />
      <MediaCardSkeleton />
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4">
      <div className="max-w-sm"><MediaCardSkeleton /></div>
      <MediaCardSkeleton layout="horizontal" />
      <div className="max-w-sm"><MediaCardSkeleton layout="overlay" aspect="square" /></div>
    </div>
  ),
}

export const CardVariants: Story = {
  name: "Card: variantes",
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
      {(["default", "outline", "elevated", "ghost"] as const).map((variant) => (
        <Card key={variant} variant={variant}>
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
            <CardDescription>variant="{variant}"</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">Contenido de ejemplo.</CardContent>
          <CardFooter>
            <Button size="sm" variant="outline">Acción</Button>
          </CardFooter>
        </Card>
      ))}
      <Card interactive>
        <CardHeader>
          <CardTitle>interactive</CardTitle>
          <CardDescription>Se levanta al pasar el cursor</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
}
