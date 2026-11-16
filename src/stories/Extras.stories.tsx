import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage, initials } from "@/components/ui/avatar"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Pagination } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const meta: Meta = { title: "Primitivos/Extras" }
export default meta
type Story = StoryObj

export const Alerts: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(true)
    return (
      <div className="grid w-[28rem] max-w-full gap-3">
        <Alert variant="info">
          <AlertTitle>Actualización disponible</AlertTitle>
          <AlertDescription>Hay una versión nueva del panel.</AlertDescription>
        </Alert>
        <Alert variant="success">
          <AlertTitle>Cambios guardados</AlertTitle>
        </Alert>
        <Alert variant="warning">
          <AlertTitle>Cuota casi llena</AlertTitle>
          <AlertDescription>Usaste el 90% del almacenamiento.</AlertDescription>
        </Alert>
        {open ? (
          <Alert variant="danger" onDismiss={() => setOpen(false)}>
            <AlertTitle>No se pudo publicar</AlertTitle>
            <AlertDescription>Revisa la conexión e inténtalo de nuevo.</AlertDescription>
          </Alert>
        ) : null}
      </div>
    )
  },
}

export const Paginated: Story = {
  render: function Render() {
    const [page, setPage] = React.useState(5)
    return (
      <div className="grid gap-4">
        <Pagination page={page} pageCount={20} onPageChange={setPage} />
        <Pagination page={2} pageCount={5} onPageChange={() => undefined} />
      </div>
    )
  },
}

export const Crumbs: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Inicio", href: "/" },
        { label: "Proyectos", href: "/proyectos" },
        { label: "Kozue UI" },
      ]}
    />
  ),
}

export const Avatars: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://invalid.example/none.png" alt="" />
        <AvatarFallback>{initials("Ada Lovelace")}</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarFallback>{initials("Kozue UI")}</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const Overlays: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Pasa el cursor</Button>
        </TooltipTrigger>
        <TooltipContent>Texto de ayuda</TooltipContent>
      </Tooltip>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Abrir popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm">Contenido flotante con foco gestionado.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const Selection: Story = {
  render: () => (
    <div className="grid gap-5">
      <div className="flex items-center gap-3">
        <Switch id="notif" defaultChecked />
        <Label htmlFor="notif">Notificaciones</Label>
      </div>
      <RadioGroup defaultValue="b" aria-label="Plan">
        {["a", "b", "c"].map((v) => (
          <div key={v} className="flex items-center gap-2">
            <RadioGroupItem value={v} id={`plan-${v}`} />
            <Label htmlFor={`plan-${v}`}>Plan {v.toUpperCase()}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  ),
}

export const Misc: Story = {
  render: () => (
    <div className="grid w-64 gap-4">
      <Spinner />
      <Separator />
      <div className="flex h-5 items-center gap-3 text-sm">
        <span>Uno</span>
        <Separator orientation="vertical" />
        <span>Dos</span>
      </div>
    </div>
  ),
}
