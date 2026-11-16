import type { Meta, StoryObj } from "@storybook/react"
import { Heart, House, MagnifyingGlass, User, ForkKnife } from "@phosphor-icons/react"
import { TabBar } from "@/components/tab-bar"

const meta: Meta<typeof TabBar> = {
  title: "Composición/TabBar",
  component: TabBar,
  parameters: { layout: "fullscreen" },
}
export default meta
type Story = StoryObj<typeof TabBar>

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-sm">
      <TabBar
        items={[
          { label: "Inicio", href: "/", icon: House, active: true },
          { label: "Proyectos", href: "/proyectos", icon: ForkKnife },
          { label: "Buscar", href: "/buscar", icon: MagnifyingGlass },
          { label: "Favoritos", href: "/favoritos", icon: Heart },
          { label: "Perfil", href: "#", icon: User, disabled: true },
        ]}
      />
    </div>
  ),
}
