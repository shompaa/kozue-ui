import { act, fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { Card, MediaCard, SiteHeader, SkipLink } from "./index"

describe("spotlight", () => {
  it("Card spotlight marca el elemento y sigue al cursor", () => {
    render(<Card spotlight data-testid="c" />)
    const el = screen.getByTestId("c")
    expect(el).toHaveAttribute("data-spotlight")
    el.getBoundingClientRect = () => ({ left: 10, top: 20, width: 100, height: 100, right: 110, bottom: 120, x: 10, y: 20, toJSON: () => ({}) })
    fireEvent.pointerMove(el, { clientX: 60, clientY: 70 })
    expect(el.style.getPropertyValue("--mx")).toBe("50px")
    expect(el.style.getPropertyValue("--my")).toBe("50px")
  })
  it("Card sin spotlight no lo marca", () => {
    render(<Card data-testid="c" />)
    expect(screen.getByTestId("c")).not.toHaveAttribute("data-spotlight")
  })
  it("MediaCard lo activa por defecto y se puede apagar", () => {
    const { container, rerender } = render(<MediaCard image="x.png" title="A" />)
    expect(container.querySelector("[data-spotlight]")).not.toBeNull()
    rerender(<MediaCard image="x.png" title="A" spotlight={false} />)
    expect(container.querySelector("[data-spotlight]")).toBeNull()
  })
})

describe("SkipLink", () => {
  it("apunta al contenido principal", () => {
    render(<SkipLink>Saltar al contenido</SkipLink>)
    expect(screen.getByRole("link", { name: "Saltar al contenido" })).toHaveAttribute("href", "#main")
  })
})

describe("SiteHeader scroll-spy", () => {
  it("marca el enlace de la sección visible", () => {
    let trigger: (entries: Partial<IntersectionObserverEntry>[]) => void = () => undefined
    class IO {
      constructor(cb: (e: IntersectionObserverEntry[]) => void) {
        trigger = (e) => cb(e as IntersectionObserverEntry[])
      }
      observe() {}
      disconnect() {}
    }
    vi.stubGlobal("IntersectionObserver", IO)
    document.body.innerHTML = '<section id="proyectos"></section>'
    render(<SiteHeader brand="Nico" links={[{ label: "Proyectos", href: "#proyectos" }]} />, { container: document.body.appendChild(document.createElement("div")) })
    act(() => trigger([{ isIntersecting: true, target: document.getElementById("proyectos")! }]))
    expect(screen.getByRole("link", { name: "Proyectos" })).toHaveAttribute("aria-current", "location")
    vi.unstubAllGlobals()
  })
})

describe("themeInitScript", () => {
  it("aplica solo temas conocidos", async () => {
    const { themeInitScript } = await import("./theme")
    document.documentElement.className = ""
    localStorage.setItem("kozue-theme", "paper")
    new Function(themeInitScript)()
    expect(document.documentElement.classList.contains("paper")).toBe(true)
    document.documentElement.className = ""
    localStorage.setItem("kozue-theme", "<script>")
    new Function(themeInitScript)()
    expect(document.documentElement.className).toBe("")
  })
})
