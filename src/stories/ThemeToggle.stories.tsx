import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ThemeToggle } from "@/components/theme-toggle"
import type { ThemeName } from "@/theme"

const meta: Meta<typeof ThemeToggle> = {
  title: "Composición/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    docs: {
      description: {
        component:
          "Cicla light → dark → paper. Sin props maneja su propio estado (localStorage + clase en <html>). Con `theme` y `onThemeChange` queda controlado, por ejemplo con next-themes. En Storybook el tema lo fija el selector de la barra superior.",
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = { render: () => <ThemeToggle /> }

export const WithLabel: Story = { render: () => <ThemeToggle showLabel className="inline-flex items-center gap-2 text-sm" /> }

export const Controlled: Story = {
  render: function Render() {
    const [theme, setTheme] = React.useState<ThemeName>("dark")
    return (
      <div className="flex items-center gap-3 text-sm">
        <ThemeToggle theme={theme} onThemeChange={setTheme} />
        <span>Estado externo: {theme}</span>
      </div>
    )
  },
}
