"use client"

import * as React from "react"
import { ImageSquare, X } from "@phosphor-icons/react"
import { cn } from "cn"
import { useMessages } from "../i18n"

const DEFAULT_ACCEPT = ["image/jpeg", "image/png", "image/webp"]

export interface ImageUploaderProps {
  value?: string | null
  onFileSelect?: (file: File | null) => void
  accept?: string[]
  maxMb?: number
  compact?: boolean
  className?: string
}

export function ImageUploader({
  value,
  onFileSelect,
  accept = DEFAULT_ACCEPT,
  maxMb = 5,
  compact = false,
  className,
}: ImageUploaderProps) {
  const m = useMessages().imageUploader
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [objectUrl, setObjectUrl] = React.useState<string | null>(null)

  React.useEffect(
    () => () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    },
    [objectUrl],
  )

  const preview = objectUrl ?? value ?? null

  function commit(file: File | null) {
    setObjectUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return file ? URL.createObjectURL(file) : null
    })
    onFileSelect?.(file)
  }

  function pick(file: File | null) {
    setError(null)
    if (!file) {
      commit(null)
      return
    }
    if (!accept.includes(file.type)) {
      setError(m.invalidFormat)
      return
    }
    if (file.size > maxMb * 1024 * 1024) {
      setError(m.tooLarge(maxMb))
      return
    }
    commit(file)
  }

  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={0}
        aria-label={m.upload}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          pick(e.dataTransfer.files[0] ?? null)
        }}
        className={cn(
          "relative grid place-items-center overflow-hidden rounded-card border border-dashed border-border bg-muted/40 text-center outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
          compact ? "h-24" : "h-44",
          dragging && "border-highlight bg-highlight/10",
        )}
      >
        {preview ? (
          <img src={preview} alt="" className="size-full object-cover" />
        ) : (
          <span className="flex flex-col items-center gap-1 p-4 text-xs text-muted-foreground">
            <ImageSquare className="size-5" aria-hidden />
            Arrastra una imagen o haz clic
            <span className="text-[10px]">{m.hint(maxMb)}</span>
          </span>
        )}
        {preview ? (
          <button
            type="button"
            aria-label={m.remove}
            onClick={(e) => {
              e.stopPropagation()
              commit(null)
            }}
            className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-card/90 text-fg hover:bg-card"
          >
            <X className="size-4" aria-hidden />
          </button>
        ) : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept.join(",")}
        onChange={(e) => pick(e.target.files?.[0] ?? null)}
      />
      {error ? (
        <p role="alert" className="mt-1 text-xs font-medium text-warning">
          {error}
        </p>
      ) : null}
    </div>
  )
}
