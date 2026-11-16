import type { Meta, StoryObj } from "@storybook/react"
import { ImageUploader } from "@/components/image-uploader"
import { IMG } from "./_mock"

const meta: Meta<typeof ImageUploader> = {
  title: "Composición/ImageUploader",
  component: ImageUploader,
}
export default meta
type Story = StoryObj<typeof ImageUploader>

export const Empty: Story = {
  render: () => <ImageUploader className="max-w-sm" />,
}

export const WithImage: Story = {
  render: () => <ImageUploader className="max-w-sm" value={IMG} />,
}

export const Compact: Story = {
  render: () => <ImageUploader className="max-w-xs" compact />,
}
