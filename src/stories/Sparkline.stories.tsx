import type { Meta, StoryObj } from "@storybook/react"
import { Sparkline } from "@/components/sparkline"
import { Card } from "@/components/ui/card"
import { sparkData } from "./_mock"

const meta: Meta<typeof Sparkline> = {
  title: "Composición/Sparkline",
  component: Sparkline,
}
export default meta
type Story = StoryObj<typeof Sparkline>

export const Default: Story = {
  render: () => (
    <Card className="max-w-xs gap-2 p-4">
      <span className="text-sm text-muted-foreground">Visitas · últimos 7 días</span>
      <span className="font-display text-2xl">12.4k</span>
      <Sparkline data={sparkData} />
    </Card>
  ),
}
