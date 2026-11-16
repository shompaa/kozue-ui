# Contribuir a kozue-ui

## Preparar el entorno

```bash
pnpm install
pnpm exec storybook dev -p 6006   # documentación y pruebas visuales manuales
pnpm test                         # vitest + axe
pnpm run typecheck
pnpm run build
```

Requiere Node 20+ y pnpm 11.

## Antes de abrir un PR

- Todo componente nuevo lleva una story y al menos una prueba (incluido un chequeo con axe).
- Los textos visibles salen del catálogo de `src/i18n.tsx`; no dejes cadenas fijas.
- Usa tokens (`bg-primary`, `text-foreground`…) y no colores literales.
- Las animaciones respetan `prefers-reduced-motion` (`motion-safe:`).
- Anota el cambio en `CHANGELOG.md` bajo una versión nueva.

## Commits

Conventional Commits: `feat(card): agregar variante glow`, `fix(dock): ...`, `docs: ...`.

## Publicar (solo la persona mantenedora)

```bash
# subir "version" en package.json y actualizar CHANGELOG.md
npm publish   # corre typecheck, tests y build antes (prepublishOnly)
```
