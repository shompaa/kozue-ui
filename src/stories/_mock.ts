export const IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='400' height='300' fill='%23c6f950'/><text x='50%' y='50%' font-family='sans-serif' font-size='28' fill='%230b0b0c' text-anchor='middle' dominant-baseline='middle'>image</text></svg>`,
  )

export interface FilaAdmin {
  id: number
  titulo: string
  categoria: string
  estado: "publicado" | "borrador"
  fecha: string
  visitas: number
}

export const filasAdmin: FilaAdmin[] = [
  { id: 1, titulo: "Pasta cremosa con parmesano", categoria: "Italiana", estado: "publicado", fecha: "24 ago 2025", visitas: 1200 },
  { id: 2, titulo: "Pollo al horno con hierbas", categoria: "Pollo", estado: "publicado", fecha: "22 ago 2025", visitas: 980 },
  { id: 3, titulo: "Cheesecake de frutos rojos", categoria: "Postres", estado: "publicado", fecha: "20 ago 2025", visitas: 754 },
  { id: 4, titulo: "Ensalada mediterránea", categoria: "Ensaladas", estado: "borrador", fecha: "18 ago 2025", visitas: 0 },
]

export const sparkData = [8, 12, 9, 15, 14, 20, 18, 26, 22, 30]

/** Imagen de relleno para stories: degradado + etiqueta, sin red. */
export function art(from: string, to: string, label = "") {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient></defs><rect width='800' height='600' fill='url(#g)'/><text x='50%' y='50%' font-family='sans-serif' font-size='44' fill='white' fill-opacity='.85' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg)
}
