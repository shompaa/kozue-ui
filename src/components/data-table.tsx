import * as React from "react"
import { cn } from "cn"
import { useMessages } from "../i18n"

export interface Column<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
  className?: string
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  getRowKey?: (row: T, index: number) => React.Key
  empty?: React.ReactNode
  className?: string
}

// colapso mobile 100% CSS (max-[560px]) — sin JS, sin media-query listeners.
export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  empty,
  className,
}: DataTableProps<T>) {
  const m = useMessages().dataTable
  if (rows.length === 0) {
    return (
      <div className="rounded-card border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        {empty ?? m.empty}
      </div>
    )
  }
  return (
    <table className={cn("w-full border-collapse text-sm max-[560px]:block", className)}>
      <thead className="max-[560px]:hidden">
        <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
          {columns.map((c) => (
            <th key={c.key} className="px-3 py-2 font-medium">
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="max-[560px]:flex max-[560px]:flex-col max-[560px]:gap-3">
        {rows.map((row, i) => (
          <tr
            key={getRowKey ? getRowKey(row, i) : i}
            className="border-b border-border last:border-0 max-[560px]:block max-[560px]:rounded-card max-[560px]:border max-[560px]:p-3"
          >
            {columns.map((c) => (
              <td
                key={c.key}
                data-label={c.header}
                className={cn(
                  "px-3 py-2 align-middle",
                  "max-[560px]:flex max-[560px]:items-center max-[560px]:justify-between max-[560px]:gap-3 max-[560px]:px-0 max-[560px]:py-1",
                  "max-[560px]:before:font-medium max-[560px]:before:text-xs max-[560px]:before:uppercase max-[560px]:before:tracking-wide max-[560px]:before:text-muted-foreground max-[560px]:before:content-[attr(data-label)]",
                  c.className,
                )}
              >
                {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
