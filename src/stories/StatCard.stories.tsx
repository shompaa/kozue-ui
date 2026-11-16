import type { Meta, StoryObj } from "@storybook/react"
import { BookOpen, FileText, TreeStructure, Eye } from "@phosphor-icons/react"
import { StatCard } from "@/components/stat-card"

const meta: Meta<typeof StatCard> = {
  title: "Composición/StatCard",
  component: StatCard,
}
export default meta
type Story = StoryObj<typeof StatCard>

export const Default: Story = {
  args: { label: "Total de proyectos", value: 128, delta: 12, icon: BookOpen },
}

export const Grid: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total de proyectos" value={128} delta={12} icon={BookOpen} />
      <StatCard label="Borradores" value={7} hint="Ver borradores" icon={FileText} />
      <StatCard label="Visitas al blog" value="12.4k" delta={18} icon={Eye} />
      <StatCard label="Categorías" value={8} delta={-3} icon={TreeStructure} />
    </div>
  ),
}
