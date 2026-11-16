import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { describe, expect, it } from "vitest"
import { Card, MediaCard, MediaCardSkeleton } from "./index"

const props = { image: "data:image/gif;base64,R0lGODlhAQABAAAAACw=", imageAlt: "Portada", title: "Kozue UI", description: "Design system" }

describe("MediaCard", () => {
  it("renderiza imagen, título y descripción", () => {
    render(<MediaCard {...props} />)
    expect(screen.getByRole("img", { name: "Portada" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Kozue UI" })).toBeInTheDocument()
    expect(screen.getByText("Design system")).toBeInTheDocument()
  })

  it("con href el título es un enlace", () => {
    render(<MediaCard {...props} href="/kozue" />)
    expect(screen.getByRole("link", { name: "Kozue UI" })).toHaveAttribute("href", "/kozue")
  })

  it("sin href no hay enlace", () => {
    render(<MediaCard {...props} />)
    expect(screen.queryByRole("link")).toBeNull()
  })

  it("imagen decorativa queda fuera del árbol accesible", () => {
    render(<MediaCard {...props} imageAlt="" />)
    expect(screen.queryByRole("img")).toBeNull()
  })

  it("acepta un linkComponent propio", () => {
    const Custom = ({ href, children, ...rest }: any) => <a data-custom href={href} {...rest}>{children}</a>
    const { container } = render(<MediaCard {...props} href="/x" linkComponent={Custom} />)
    expect(container.querySelector("[data-custom]")).not.toBeNull()
  })

  for (const layout of ["vertical", "horizontal", "overlay"] as const) {
    it(`layout ${layout} sin violaciones axe`, async () => {
      const { container } = render(<MediaCard {...props} layout={layout} href="/k" eyebrow="Librería" meta="hoy" footer={<button>Ver</button>} />)
      // vitest 5 no mergea tipos de vitest-axe, cast hasta que lo arreglen
      ;(expect(await axe(container)) as any).toHaveNoViolations()
    })
  }

  it("skeleton va oculto a lectores de pantalla", () => {
    const { container } = render(<MediaCardSkeleton />)
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true")
  })
})

describe("Card variantes", () => {
  it("padding none quita el padding vertical", () => {
    render(<Card padding="none" data-testid="c" />)
    expect(screen.getByTestId("c").className).toContain("py-0")
  })
  it("interactive agrega el hover", () => {
    render(<Card interactive data-testid="c" />)
    expect(screen.getByTestId("c").className).toContain("hover:-translate-y-0.5")
  })
  it("default conserva el padding original", () => {
    render(<Card data-testid="c" />)
    expect(screen.getByTestId("c").className).toContain("py-6")
  })
})
