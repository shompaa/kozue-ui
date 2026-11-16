import type { Meta, StoryObj } from "@storybook/react"
import { BookOpen, TreeStructure, SquaresFour, ChatCircle, Users } from "@phosphor-icons/react"
import { Sidebar } from "@/components/sidebar"

const meta: Meta<typeof Sidebar> = {
  title: "Composición/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
}
export default meta
type Story = StoryObj<typeof Sidebar>

const items = [
  { label: "Inicio", href: "/admin", icon: SquaresFour, active: true },
  { label: "Proyectos", href: "/admin/proyectos", icon: BookOpen },
  { label: "Categorías", href: "/admin/categorias", icon: TreeStructure },
  { label: "Usuarios", href: "/admin/usuarios", icon: Users },
  { label: "Suscriptores", href: "/admin/suscriptores", icon: Users },
  { label: "Comentarios", href: "#", icon: ChatCircle, disabled: true },
]

export const Default: Story = {
  render: () => (
    <div className="h-[560px]">
      <Sidebar items={items} user={{ name: "Nico", role: "Administrador" }} />
    </div>
  ),
}
