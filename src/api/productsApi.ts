import type { Product } from '../types/product'

const STORAGE_KEY = 'products-storage'

const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const generateMockProducts = (): Product[] => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: crypto.randomUUID(),
    nombre: `Producto ${i + 1}`,
    precio: Math.floor(Math.random() * 100) + 1,
    stock: Math.floor(Math.random() * 200),
  }))
}

const getState = (): Product[] => {
  const raw = localStorage.getItem(STORAGE_KEY)
  try {
    const parsed = JSON.parse(raw || '{}')
    const productos = parsed?.state?.products

    if (!productos || productos.length === 0) {
      const mock = generateMockProducts()
      saveState(mock)
      return mock
    }

    return productos
  } catch {
    const mock = generateMockProducts()
    saveState(mock)
    return mock
  }
}

const saveState = (products: Product[]) => {
  const raw = localStorage.getItem(STORAGE_KEY)
  const base = raw ? JSON.parse(raw) : { state: {} }
  base.state.products = products
  localStorage.setItem(STORAGE_KEY, JSON.stringify(base))
}

export const fetchProducts = async (): Promise<Product[]> => {
  await simulateDelay(300)
  return getState()
}

export const createProduct = async (product: Product): Promise<void> => {
  await simulateDelay(300)
  const current = getState()
  saveState([...current, product])
}

export const updateProduct = async (updated: Product): Promise<void> => {
  await simulateDelay(300)
  const current = getState().map(p => (p.id === updated.id ? updated : p))
  saveState(current)
}
