# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/); versionado semántico.

## [0.1.1] - 2026-11-16

### Añadido
- Enlaces al repositorio, página de inicio y bugs en `package.json`.
- Integración continua (typecheck, tests, build del paquete y de Storybook).
- Guía de contribución.

## [0.1.0] - 2026-11-16

### Añadido
- Tokens semánticos con 4 temas (`dark`, `light`, `paper`, `violet`), radio de botón y fuentes configurables.
- 25 primitivos: Button, Badge, Card, Input, Label, Textarea, Select, Checkbox, Switch, RadioGroup, Tabs, Dialog, Sheet, Popover, Tooltip, DropdownMenu, Accordion, Table, Alert, Pagination, Breadcrumb, Avatar, Separator, Spinner, Sonner.
- Componentes de composición: StatCard, DataTable, Sidebar, TopBar, TabBar, FormField, ImageUploader, Sparkline, MediaCard, Timeline, Dock, SiteHeader, TechStack, CtaBand, SectionHeading.
- Feedback: EmptyState, ErrorState, SaveStatus, ProgressBar, ConfirmDialog, Skeleton, Chip.
- Textos traducibles con `KozueProvider` (catálogos `en` y `es`).
- `ThemeToggle`, `useKozueTheme` y `themeInitScript` sin dependencias de terceros.
- Utilidades de acabado: `reveal` (animación por scroll), `grain` y borde con spotlight (`initSpotlight`).
