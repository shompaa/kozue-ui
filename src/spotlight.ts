let started = false

/** Registra (una sola vez) el seguimiento del cursor para los elementos con [data-spotlight]. */
export function initSpotlight() {
  if (started || typeof document === "undefined") return
  started = true
  document.addEventListener(
    "pointermove",
    (e) => {
      const el = (e.target as Element | null)?.closest?.("[data-spotlight]") as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty("--mx", `${e.clientX - r.left}px`)
      el.style.setProperty("--my", `${e.clientY - r.top}px`)
    },
    { passive: true },
  )
}
