import type { Meta, StoryObj } from "@storybook/react"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { filasAdmin, type FilaAdmin } from "./_mock"

const meta: Meta = {
  title: "Composición/DataTable",
}
export default meta
type Story = StoryObj

const columns = [
  { key: "titulo", header: "Título" },
  { key: "categoria", header: "Categoría" },
  {
    key: "estado",
    header: "Estado",
    render: (r: FilaAdmin) => (
      <Badge variant={r.estado === "publicado" ? "success" : "warning"}>
        {r.estado === "publicado" ? "Publicado" : "Borrador"}
      </Badge>
    ),
  },
  { key: "fecha", header: "Fecha" },
  { key: "visitas", header: "Visitas", className: "text-right", render: (r: FilaAdmin) => r.visitas.toLocaleString("es") },
]

export const Default: Story = {
  render: () => <DataTable columns={columns} rows={filasAdmin} getRowKey={(r) => r.id} />,
}

export const Empty: Story = {
  render: () => <DataTable columns={columns} rows={[]} empty="Todavía no hay elementos." />,
}
