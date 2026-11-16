# kozue-ui

[![npm](https://img.shields.io/npm/v/kozue-ui)](https://www.npmjs.com/package/kozue-ui)
[![licencia](https://img.shields.io/npm/l/kozue-ui)](./LICENSE)
[![CI](https://github.com/shompaa/kozue-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/shompaa/kozue-ui/actions/workflows/ci.yml)

Design system para React y Tailwind CSS 4. Incluye tokens semánticos con 4 temas, primitivos accesibles (basados en Radix), componentes de composición, textos traducibles y animaciones que respetan `prefers-reduced-motion`.

- 4 temas: `dark`, `light`, `paper` y `violet`.
- Más de 50 componentes con tipos de TypeScript.
- Textos del sistema en inglés y español, con posibilidad de sobrescribirlos.
- Tests de accesibilidad con axe y Storybook con selector de tema e idioma.

## Instalación

```bash
npm install kozue-ui
```

Requiere React 19+ y Tailwind CSS 4.1+.

```css
/* app.css */
@import "kozue-ui/preset.css";
@source "../node_modules/kozue-ui/dist"; /* obligatorio: sin esta línea Tailwind elimina las clases del paquete */
```

```tsx
import { Button, StatCard } from "kozue-ui"

export function Example() {
  return <Button>Guardar</Button>
}
```

Los componentes son de cliente (el paquete declara `"use client"`), así que funcionan en Next.js App Router y en Astro como islas.

## Temas

Agrega una de estas clases a `<html>`: `dark`, `light`, `paper` o `violet`.

```tsx
import { useKozueTheme, ThemeToggle } from "kozue-ui"
```

- `ThemeToggle` funciona solo: guarda la elección en `localStorage` y la aplica como clase.
- Con `theme` y `onThemeChange` queda controlado, por ejemplo con next-themes.
- Para evitar el parpadeo al cargar, inserta `themeInitScript` en el `<head>`:

```tsx
import { themeInitScript } from "kozue-ui"

<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
```

## Tokens

Las clases de Tailwind salen de estas variables:

| Grupo | Tokens |
|---|---|
| Base | `bg`, `surface`, `surface-2`, `border`, `outline`, `fg`, `fg-muted` |
| Marca | `primary`, `primary-foreground`, `primary-text`, `highlight`, `highlight-text`, `tertiary` |
| Estado | `success`, `warning`, `danger`, `info` |
| Forma y tipografía | `--radius`, `--radius-button`, `--font-sans`, `--font-display`, `--font-hand` |

Ejemplos: `bg-primary`, `text-primary-text`, `border-border`, `rounded-button`, `font-display`.

El proyecto usa tokens semánticos. Para crear un tema propio, define esas variables dentro de una clase:

```css
.mi-tema {
  --bg: #101114;
  --surface: #181a1f;
  --primary: #4f8cff;
  --primary-foreground: #ffffff;
  /* ...el resto de los tokens */
}
```

La story **Tokens** de Storybook muestra cada color con su contraste.

## Textos (i18n)

Ningún componente trae texto fijo. Todo sale de un catálogo (`en` por defecto, `es` incluido):

```tsx
import { KozueProvider, es } from "kozue-ui"

<KozueProvider messages={es} overrides={{ dataTable: { empty: "Nada por aquí" } }}>
  <App />
</KozueProvider>
```

Prioridad: prop del componente > `overrides` > catálogo.

## Componentes

- **Primitivos:** Button, Badge, Card, Input, Label, Textarea, Select, Checkbox, Switch, RadioGroup, Tabs, Dialog, Sheet, Popover, Tooltip, DropdownMenu, Accordion, Table, Alert, Pagination, Breadcrumb, Avatar, Separator, Spinner, Sonner.
- **Texto y átomos:** Heading, Text, Chip, Skeleton.
- **Feedback:** EmptyState, ErrorState, SaveStatus, ProgressBar, ConfirmDialog.
- **Paneles y datos:** StatCard, DataTable, Sidebar, TopBar, TabBar, FormField, ImageUploader, Sparkline, ThemeToggle.
- **Sitios y portafolios:** MediaCard (vertical, horizontal, overlay e inset), Timeline, Dock, SiteHeader, SkipLink, SiteFooter, TechStack, SectionHeading, CtaBand.

`Card` acepta `variant` (`default`, `outline`, `elevated`, `ghost`, `solid`, `glow`), `padding`, `interactive` y `spotlight`. `Button` incluye las variantes `brand` y `line`.

### Íconos de tecnología

`TechStack` y `TechIcon` reciben datos simples (`title`, `hex`, `path`, `viewBox`), por lo que sirven con cualquier librería de íconos, por ejemplo `simple-icons` o `devicon`. Los logos casi negros se pintan con el color de texto para que se vean sobre fondos oscuros.

### Animaciones

- `className="reveal"`: aparece al hacer scroll (en navegadores con scroll-driven animations).
- `className="grain"` en `<body>`: textura de grano sutil.
- `Card spotlight`: borde que se ilumina con el cursor. En HTML estático, llama a `initSpotlight()` desde `kozue-ui/spotlight`.

## Accesibilidad

Foco visible, roles y etiquetas ARIA, enlace "Saltar al contenido" (`SkipLink`) y animaciones desactivables con `prefers-reduced-motion`. Los tests usan axe, que en jsdom no mide el contraste de color.

## Desarrollo

```bash
pnpm install
pnpm exec storybook dev -p 6006   # documentación
pnpm test                         # pruebas
pnpm run typecheck
pnpm run build
```

Guía completa en [CONTRIBUTING.md](./CONTRIBUTING.md).

## Licencia

MIT © shompaa
