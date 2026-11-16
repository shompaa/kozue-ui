import { fireEvent, render, screen, within } from "@testing-library/react"
import { axe } from "vitest-axe"
import { describe, expect, it } from "vitest"
import { CtaBand, Dock, MediaCard, SectionHeading, SiteFooter, SiteHeader, TechStack, Timeline } from "./index"

const noViolations = async (container: HTMLElement) =>
  // vitest 5 no mergea tipos de vitest-axe, cast hasta que lo arreglen
  (expect(await axe(container)) as any).toHaveNoViolations()

const jobs = [
  { title: "Acme Labs", subtitle: "Full-Stack", dates: "Marzo 2021 - Actualidad", summary: "Resumen A", tags: ["Angular", "React"] },
  { title: "Great Place (GPTW)", subtitle: "Dev", dates: "2019 - 2021", summary: "Resumen B" },
]

describe("Timeline", () => {
  it("numera los nodos y calcula iniciales", () => {
    render(<Timeline items={jobs} />)
    expect(screen.getByText("AL")).toBeInTheDocument()
    expect(screen.getByText("GP")).toBeInTheDocument()
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
  })
  it("alterna lado: el segundo item invierte las columnas", () => {
    const { container } = render(<Timeline items={jobs} />)
    const [first, second] = Array.from(container.querySelectorAll("li.relative"))
    const cards = (li: Element) => Array.from(li.querySelectorAll('[data-slot="card"]')) as HTMLElement[]
    expect(cards(first)[0].className).toContain("col-start-1")
    expect(cards(second)[0].className).toContain("col-start-3")
  })
  it("sin tags no pinta lista", () => {
    render(<Timeline items={[jobs[1]]} />)
    expect(screen.queryByText("Angular")).toBeNull()
  })
  it("sin violaciones axe", async () => {
    const { container } = render(<Timeline items={jobs} />)
    await noViolations(container)
  })
})

describe("Dock", () => {
  const items = [
    { href: "https://github.com/x", label: "GitHub", path: "M0 0", filled: true, external: true },
    { href: "/cv.pdf", label: "CV", path: "M0 0", download: true },
  ]
  it("enlaces externos abren seguros y descarga marca download", () => {
    render(<Dock items={items} />)
    const gh = screen.getByRole("link", { name: "GitHub" })
    expect(gh).toHaveAttribute("target", "_blank")
    expect(gh).toHaveAttribute("rel", "noopener noreferrer")
    expect(screen.getByRole("link", { name: "CV" })).toHaveAttribute("download")
  })
  it("sin violaciones axe", async () => {
    const { container } = render(<Dock items={items} label="Enlaces" />)
    await noViolations(container)
  })
})

describe("TechStack", () => {
  it("renderiza path o insignia de texto", () => {
    render(<TechStack groups={[{ label: "Cloud", items: [{ title: "AWS", hex: "FF9900", text: "aws" }, { title: "Git", hex: "F05032", path: "M0 0h24v24H0z" }] }]} />)
    expect(screen.getByRole("img", { name: "AWS" })).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Git" }).querySelector("path")).not.toBeNull()
    expect(screen.getByText("Cloud")).toBeInTheDocument()
  })
})

describe("SiteHeader", () => {
  it("el botón abre y cierra el menú móvil", () => {
    render(<SiteHeader brand="Nico" links={[{ label: "Inicio", href: "#a" }]} menuLabel="Menú" />)
    const btn = screen.getByRole("button", { name: "Menú" })
    expect(btn).toHaveAttribute("aria-expanded", "false")
    fireEvent.click(btn)
    expect(btn).toHaveAttribute("aria-expanded", "true")
    fireEvent.click(within(screen.getByRole("navigation")).getByRole("link", { name: "Inicio" }))
    expect(btn).toHaveAttribute("aria-expanded", "false")
  })
  it("marca el idioma actual", () => {
    render(<SiteHeader brand="Nico" links={[]} languages={[{ label: "ES", href: "/", current: true }, { label: "EN", href: "/en/" }]} />)
    expect(screen.getByRole("link", { name: "ES" })).toHaveAttribute("aria-current", "true")
    expect(screen.getByRole("link", { name: "EN" })).not.toHaveAttribute("aria-current")
  })
  it("sin violaciones axe junto al footer", async () => {
    const { container } = render(
      <>
        <SiteHeader brand="Nico" links={[{ label: "Inicio", href: "#a" }]} languages={[{ label: "ES", href: "/", current: true }]} />
        <SiteFooter brand="Nico" note="© 2026" />
      </>,
    )
    await noViolations(container)
  })
})

describe("SectionHeading, CtaBand y MediaCard inset", () => {
  it("SectionHeading muestra eyebrow y título", () => {
    render(<SectionHeading eyebrow="Sobre mí" title="Resumen" />)
    expect(screen.getByText("Sobre mí")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Resumen" })).toBeInTheDocument()
  })
  it("CtaBand renderiza la acción", () => {
    render(<CtaBand title="Hablemos" description="texto"><a href="#">Escríbeme</a></CtaBand>)
    expect(screen.getByRole("link", { name: "Escríbeme" })).toBeInTheDocument()
  })
  it("MediaCard inset muestra tags y acciones", () => {
    render(<MediaCard layout="inset" image="x.png" imageAlt="p" title="Proyecto" tags={["React", "Vite"]} actions={<a href="#">Demo</a>} />)
    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Demo" })).toBeInTheDocument()
  })
})

describe("TechIcon colores y viewBox", () => {
  it("pinta con currentColor los logos casi negros", () => {
    const { container } = render(<TechStack groups={[{ label: "x", items: [{ title: "Next.js", hex: "000000", path: "M0 0h24v24H0z" }, { title: "React", hex: "61DAFB", path: "M0 0h24v24H0z" }] }]} />)
    const fills = Array.from(container.querySelectorAll("path")).map((p) => p.getAttribute("fill"))
    expect(fills).toEqual(["currentColor", "#61DAFB"])
  })
  it("respeta un viewBox distinto para trazos de devicon", () => {
    render(<TechStack groups={[{ label: "x", items: [{ title: "AWS", hex: "FF9900", path: "M0 0h128v128H0z", viewBox: "0 0 128 128" }] }]} />)
    expect(screen.getByRole("img", { name: "AWS" })).toHaveAttribute("viewBox", "0 0 128 128")
  })
})
