import type { Meta, StoryObj } from "@storybook/react"
import { FormField } from "@/components/form-field"
import { Input } from "@/components/ui/input"

const meta: Meta<typeof FormField> = {
  title: "Composición/FormField",
  component: FormField,
}
export default meta
type Story = StoryObj<typeof FormField>

export const Default: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <FormField label="Título" htmlFor="titulo" required hint="Aparece en la card y el detalle.">
        <Input id="titulo" defaultValue="Pasta cremosa con parmesano" />
      </FormField>
      <FormField label="Slug" htmlFor="slug" error="Ese slug ya existe, se usará “-2”.">
        <Input id="slug" defaultValue="pasta-cremosa" aria-invalid />
      </FormField>
    </div>
  ),
}
