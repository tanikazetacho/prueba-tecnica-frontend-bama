import type { Product } from '../types/product'

export function filterProducts(products: Product[], query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(
    p =>
      p.id.toString().toLowerCase().includes(q) ||
      p.nombre.toLowerCase().includes(q) ||
      p.precio.toString().includes(q) ||
      p.stock.toString().includes(q)
  )
}
