import { fireEvent, render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { describe, expect, it, vi } from "vitest"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Breadcrumb,
  KozueProvider,
  Label,
  Pagination,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Spinner,
  Switch,
  ThemeToggle,
  TopBar,
  es,
  getPageRange,
  initials,
} from "./index"

const noViolations = async (container: HTMLElement) =>
  // vitest 5 no mergea tipos de vitest-axe, cast hasta que lo arreglen
  (expect(await axe(container)) as any).toHaveNoViolations()

describe("getPageRange", () => {
  it("muestra todo si caben", () => {
    expect(getPageRange(1, 5)).toEqual([1, 2, 3, 4, 5])
  })
  it("elipsis solo al final cerca del inicio", () => {
    expect(getPageRange(1, 20)).toEqual([1, 2, 3, 4, 5, "ellipsis-end", 20])
  })
  it("elipsis solo al inicio cerca del final", () => {
    expect(getPageRange(20, 20)).toEqual([1, "ellipsis-start", 16, 17, 18, 19, 20])
  })
  it("elipsis a ambos lados en el medio", () => {
    expect(getPageRange(10, 20)).toEqual([1, "ellipsis-start", 9, 10, 11, "ellipsis-end", 20])
  })
  it("sin páginas no devuelve nada", () => {
    expect(getPageRange(1, 0)).toEqual([])
  })
})

describe("Pagination", () => {
  it("marca la página actual y navega", () => {
    const onPageChange = vi.fn()
    render(<Pagination page={3} pageCount={10} onPageChange={onPageChange} />)
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute("aria-current", "page")
    fireEvent.click(screen.getByRole("button", { name: "Next page" }))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })
  it("deshabilita anterior en la primera página", () => {
    render(<Pagination page={1} pageCount={10} onPageChange={() => undefined} />)
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled()
  })
  it("no renderiza con una sola página", () => {
    const { container } = render(<Pagination page={1} pageCount={1} onPageChange={() => undefined} />)
    expect(container).toBeEmptyDOMElement()
  })
  it("traduce las etiquetas", () => {
    render(
      <KozueProvider messages={es}>
        <Pagination page={2} pageCount={5} onPageChange={() => undefined} />
      </KozueProvider>,
    )
    expect(screen.getByRole("button", { name: "Página siguiente" })).toBeInTheDocument()
  })
})

describe("Alert", () => {
  it("danger usa role alert y el resto status", () => {
    render(
      <>
        <Alert variant="danger"><AlertTitle>Fallo</AlertTitle></Alert>
        <Alert variant="info"><AlertTitle>Dato</AlertTitle></Alert>
      </>,
    )
    expect(screen.getByRole("alert")).toHaveTextContent("Fallo")
    expect(screen.getByRole("status")).toHaveTextContent("Dato")
  })
  it("onDismiss muestra un botón que lo dispara", () => {
    const onDismiss = vi.fn()
    render(<Alert onDismiss={onDismiss}><AlertDescription>Texto</AlertDescription></Alert>)
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })
})

describe("otros primitivos", () => {
  it("initials toma las primeras letras", () => {
    expect(initials("ada lovelace king")).toBe("AL")
    expect(initials("  ")).toBe("")
  })
  it("Switch cambia de estado", () => {
    render(<Switch aria-label="Notificaciones" />)
    const sw = screen.getByRole("switch", { name: "Notificaciones" })
    expect(sw).toHaveAttribute("aria-checked", "false")
    fireEvent.click(sw)
    expect(sw).toHaveAttribute("aria-checked", "true")
  })
  it("RadioGroup selecciona una opción", () => {
    render(
      <RadioGroup aria-label="Plan" defaultValue="a">
        <RadioGroupItem value="a" id="a" />
        <Label htmlFor="a">A</Label>
        <RadioGroupItem value="b" id="b" />
        <Label htmlFor="b">B</Label>
      </RadioGroup>,
    )
    fireEvent.click(screen.getByRole("radio", { name: "B" }))
    expect(screen.getByRole("radio", { name: "B" })).toBeChecked()
  })
  it("ThemeToggle controlado avisa el siguiente tema", () => {
    const onThemeChange = vi.fn()
    render(<ThemeToggle theme="dark" onThemeChange={onThemeChange} />)
    fireEvent.click(screen.getByRole("button"))
    expect(onThemeChange).toHaveBeenCalledWith("paper")
  })
  it("ThemeToggle sin props aplica la clase en <html>", () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole("button"))
    expect(document.documentElement.classList.contains("paper")).toBe(true)
    expect(localStorage.getItem("kozue-theme")).toBe("paper")
  })
  it("TopBar usa searchAction y puede ocultar la búsqueda", () => {
    const { container, rerender } = render(<TopBar searchAction="/find" />)
    expect(container.querySelector("form")).toHaveAttribute("action", "/find")
    rerender(<TopBar hideSearch />)
    expect(container.querySelector("form")).toBeNull()
  })
})

describe("a11y extras", () => {
  it("sin violaciones axe", async () => {
    const { container } = render(
      <>
        <Alert variant="warning"><AlertTitle>Cuidado</AlertTitle><AlertDescription>Detalle</AlertDescription></Alert>
        <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Actual" }]} />
        <Pagination page={2} pageCount={6} onPageChange={() => undefined} />
        <Avatar><AvatarFallback>NN</AvatarFallback></Avatar>
        <Switch aria-label="Modo" />
        <Spinner />
        <Separator />
      </>,
    )
    await noViolations(container)
  })
})
