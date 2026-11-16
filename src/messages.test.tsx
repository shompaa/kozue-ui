import { fireEvent, render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { describe, expect, it, vi } from "vitest"
import {
  Chip,
  ConfirmDialog,
  DataTable,
  EmptyState,
  ErrorState,
  KozueProvider,
  ProgressBar,
  SaveStatus,
  Skeleton,
  es,
} from "./index"

describe("mensajes", () => {
  it("usa inglés por defecto", () => {
    render(<DataTable columns={[]} rows={[]} />)
    expect(screen.getByText("No results")).toBeInTheDocument()
  })

  it("cambia de idioma con el provider", () => {
    render(
      <KozueProvider messages={es}>
        <DataTable columns={[]} rows={[]} />
      </KozueProvider>,
    )
    expect(screen.getByText("Sin resultados")).toBeInTheDocument()
  })

  it("permite sobrescribir un texto puntual", () => {
    render(
      <KozueProvider messages={es} overrides={{ dataTable: { empty: "Nada por aquí" } }}>
        <DataTable columns={[]} rows={[]} />
      </KozueProvider>,
    )
    expect(screen.getByText("Nada por aquí")).toBeInTheDocument()
  })

  it("la prop del componente gana al provider", () => {
    render(
      <KozueProvider messages={es}>
        <DataTable columns={[]} rows={[]} empty="Vacío" />
      </KozueProvider>,
    )
    expect(screen.getByText("Vacío")).toBeInTheDocument()
  })
})

describe("componentes rescatados", () => {
  it("ProgressBar expone valores aria", () => {
    render(<ProgressBar value={3} total={8} unit="tasks" />)
    const bar = screen.getByRole("progressbar")
    expect(bar).toHaveAttribute("aria-valuenow", "3")
    expect(bar).toHaveAttribute("aria-valuetext", "3 of 8 tasks")
  })

  it("ProgressBar limita el valor al total", () => {
    render(<ProgressBar value={20} total={8} />)
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "8")
  })

  it("ProgressBar sin total muestra el texto vacío", () => {
    render(<ProgressBar value={0} total={0} />)
    expect(screen.getByText("Nothing to show")).toBeInTheDocument()
  })

  it("SaveStatus muestra la hora al guardar", () => {
    render(<SaveStatus state="saved" savedAt="14:32" />)
    expect(screen.getByRole("status")).toHaveTextContent("Saved · 14:32")
  })

  it("ErrorState llama onRetry", () => {
    const onRetry = vi.fn()
    render(<ErrorState onRetry={onRetry} />)
    fireEvent.click(screen.getByRole("button", { name: "Try again" }))
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it("Chip refleja el estado en aria-pressed", () => {
    render(<Chip active>Filtro</Chip>)
    expect(screen.getByRole("button", { name: "Filtro" })).toHaveAttribute("aria-pressed", "true")
  })

  it("ConfirmDialog exige escribir el texto", () => {
    const onConfirm = vi.fn()
    render(
      <ConfirmDialog open onOpenChange={() => undefined} onConfirm={onConfirm} title="Delete?" description="No undo" requireText="delete" />,
    )
    const confirm = screen.getByRole("button", { name: "Confirm" })
    expect(confirm).toBeDisabled()
    fireEvent.change(screen.getByLabelText("Type delete to continue"), { target: { value: "DELETE" } })
    expect(confirm).toBeEnabled()
    fireEvent.click(confirm)
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it("EmptyState, ErrorState y Skeleton sin violaciones axe", async () => {
    const { container } = render(
      <>
        <EmptyState title="Empty" description="Nothing yet" />
        <ErrorState />
        <Skeleton className="h-4 w-10" />
      </>,
    )
    // vitest 5 no mergea tipos de vitest-axe, cast hasta que lo arreglen
    ;(expect(await axe(container)) as any).toHaveNoViolations()
  })
})
