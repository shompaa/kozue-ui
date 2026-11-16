import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Tray } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/chip"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { EmptyState } from "@/components/empty-state"
import { ErrorState } from "@/components/error-state"
import { ProgressBar } from "@/components/progress-bar"
import { SaveStatus } from "@/components/save-status"
import { Skeleton } from "@/components/skeleton"
import { Heading, Text } from "@/components/text"

const meta: Meta = { title: "Átomos/Feedback y texto" }
export default meta
type Story = StoryObj

export const Typography: Story = {
  render: () => (
    <div className="grid max-w-xl gap-3">
      <Heading as="h1" size="xl">Heading xl</Heading>
      <Heading size="lg">Heading lg</Heading>
      <Heading as="h3" size="md">Heading md</Heading>
      <Heading as="h4" size="sm">Heading sm</Heading>
      <Text size="lg">Text lg, texto por defecto.</Text>
      <Text>Text md, texto por defecto.</Text>
      <Text tone="muted" size="sm">Text sm, tono muted.</Text>
      <Text tone="primary" weight="bold">Text tono primary en negrita.</Text>
      <Text tone="danger">Text tono danger.</Text>
    </div>
  ),
}

export const Empty: Story = {
  render: () => (
    <EmptyState
      icon={<Tray size={28} />}
      title="Aún no hay proyectos"
      description="Crea el primero para verlo aquí."
      action={<Button size="sm">Crear proyecto</Button>}
    />
  ),
}

export const ErrorWithRetry: Story = {
  render: () => <ErrorState onRetry={() => undefined} />,
}

export const Loading: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
}

export const Progress: Story = {
  render: () => (
    <div className="grid w-80 gap-4">
      <ProgressBar value={3} total={8} unit="tareas" />
      <ProgressBar value={8} total={8} unit="tareas" />
      <ProgressBar value={0} total={0} />
    </div>
  ),
}

export const Saving: Story = {
  render: () => (
    <div className="grid gap-2">
      <SaveStatus state="saving" />
      <SaveStatus state="saved" savedAt="14:32" />
      <SaveStatus state="error" />
    </div>
  ),
}

export const Chips: Story = {
  render: function Render() {
    const [on, setOn] = React.useState("a")
    return (
      <div className="flex gap-2">
        {["a", "b", "c"].map((k) => (
          <Chip key={k} active={on === k} onClick={() => setOn(k)}>
            Filtro {k.toUpperCase()}
          </Chip>
        ))}
      </div>
    )
  },
}

export const Confirm: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>Eliminar cuenta</Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          onConfirm={() => setOpen(false)}
          title="¿Eliminar cuenta?"
          description="Esta acción no se puede deshacer."
          requireText="eliminar"
        />
      </>
    )
  },
}
