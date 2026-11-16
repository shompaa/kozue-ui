import { render } from "@testing-library/react"
import { axe } from "vitest-axe"
import { describe, expect, it } from "vitest"
import { Badge, Button, Card, FormField, Input, StatCard } from "./index"

const cases: Record<string, React.ReactElement> = {
  Button: <Button>Guardar</Button>,
  "Button icon con aria-label": <Button size="icon" aria-label="Cerrar">x</Button>,
  Badge: <Badge>Nuevo</Badge>,
  Card: <Card>Contenido</Card>,
  StatCard: <StatCard label="Proyectos" value={12} delta={4} hint="este mes" />,
  "FormField + Input": (
    <FormField label="Correo" htmlFor="mail" hint="Usamos este correo para avisarte">
      <Input id="mail" type="email" />
    </FormField>
  ),
  "FormField con error": (
    <FormField label="Correo" htmlFor="mail2" error="Correo inválido">
      <Input id="mail2" type="email" aria-invalid />
    </FormField>
  ),
}

describe("a11y", () => {
  for (const [name, ui] of Object.entries(cases)) {
    it(`${name} sin violaciones axe`, async () => {
      const { container } = render(ui)
      // vitest 5 no mergea tipos de vitest-axe, cast hasta que lo arreglen
      ;(expect(await axe(container)) as any).toHaveNoViolations()
    })
  }
})
