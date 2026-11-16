import type { Meta, StoryObj } from "@storybook/react"
import { Plus } from "@phosphor-icons/react"
import { TopBar } from "@/components/top-bar"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof TopBar> = {
  title: "Composición/TopBar",
  component: TopBar,
  parameters: { layout: "fullscreen" },
}
export default meta
type Story = StoryObj<typeof TopBar>

export const Default: Story = {
  args: { date: "24 ago 2025" },
}

export const WithAction: Story = {
  render: () => (
    <TopBar
      date="24 ago 2025"
      actions={
        <Button size="sm">
          <Plus className="size-4" /> Nuevo proyecto
        </Button>
      }
    />
  ),
}
