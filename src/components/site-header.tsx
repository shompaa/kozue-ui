"use client"

import * as React from "react"
import { cn } from "cn"

export function Wordmark({ mark = "</>", href = "#", children, className }: { mark?: string; href?: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={cn("flex items-center gap-2.5 whitespace-nowrap font-bold text-foreground", className)}>
      <span aria-hidden className="font-black tracking-[-3px] text-highlight">{mark}</span>
      {children}
    </a>
  )
}

export interface SiteLink {
  label: string
  href: string
}

export interface LanguageOption {
  label: string
  href: string
  current?: boolean
}

export interface SiteHeaderProps {
  brand: string
  brandMark?: string
  brandHref?: string
  links: SiteLink[]
  languages?: LanguageOption[]
  menuLabel?: string
  className?: string
}

/** Barra superior flotante con efecto vidrio: marca, enlaces, idiomas y menú móvil. */
export function SiteHeader({ brand, brandMark, brandHref = "#", links, languages, menuLabel = "Menu", className }: SiteHeaderProps) {
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState<string | null>(null)
  const anchors = links.map((l) => l.href).filter((h) => h.startsWith("#") && h.length > 1).join(",")
  React.useEffect(() => {
    const els = anchors
      .split(",")
      .map((h) => (h ? document.getElementById(h.slice(1)) : null))
      .filter((el): el is HTMLElement => !!el)
    if (els.length === 0 || !("IntersectionObserver" in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive("#" + e.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [anchors])
  return (
    <header
      className={cn(
        "fixed left-1/2 top-2 z-30 flex h-12 w-[min(1000px,calc(100%-32px))] -translate-x-1/2 items-center justify-between gap-4 rounded-xl border border-input bg-card/80 pl-4 pr-3 shadow-[0_10px_34px_-12px,inset_0_1px_0_rgba(255,255,255,.07)] shadow-highlight/30 backdrop-blur-[11px]",
        className,
      )}
    >
      <Wordmark mark={brandMark} href={brandHref}>{brand}</Wordmark>
      <nav
        onClick={() => setOpen(false)}
        className={cn(
          "flex gap-[22px] text-[.85rem] text-foreground/85",
          "max-[800px]:absolute max-[800px]:right-0 max-[800px]:top-14 max-[800px]:w-[220px] max-[800px]:flex-col max-[800px]:gap-3 max-[800px]:rounded-[10px] max-[800px]:border max-[800px]:border-input max-[800px]:bg-card max-[800px]:p-3.5",
          open ? "max-[800px]:flex" : "max-[800px]:hidden",
        )}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            aria-current={active === l.href ? "location" : undefined}
            className="relative transition-colors duration-200 hover:text-foreground aria-[current=location]:text-foreground aria-[current=location]:after:absolute aria-[current=location]:after:inset-x-0 aria-[current=location]:after:-bottom-1.5 aria-[current=location]:after:h-0.5 aria-[current=location]:after:rounded-full aria-[current=location]:after:bg-primary-text aria-[current=location]:after:content-['']"
          >
            {l.label}
          </a>
        ))}
      </nav>
      {languages ? (
        <div className="flex gap-2.5 text-[.8rem]">
          {languages.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={l.current ? "true" : undefined}
              className={l.current ? "font-bold text-foreground" : "text-muted-foreground"}
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
      <button
        type="button"
        aria-label={menuLabel}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="hidden rounded-[7px] border border-border bg-card px-2.5 py-1.5 text-foreground max-[800px]:block"
      >
        ☰
      </button>
    </header>
  )
}

export function SkipLink({ href = "#main", children }: { href?: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="fixed left-4 top-2 z-50 -translate-y-20 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0"
    >
      {children}
    </a>
  )
}

export function SiteFooter({ brand, brandMark, note, className }: { brand: string; brandMark?: string; note?: string; className?: string }) {
  return (
    <footer className={cn("border-t border-border bg-background py-6 text-[.85rem]", className)}>
      <div className="mx-auto flex max-w-[1040px] flex-wrap items-center justify-between gap-4 px-6">
        <Wordmark mark={brandMark}>{brand}</Wordmark>
        {note ? <small className="text-muted-foreground">{note}</small> : null}
      </div>
    </footer>
  )
}
