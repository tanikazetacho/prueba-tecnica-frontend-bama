import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../types/product'
import {
  createProduct as apiCreate,
  fetchProducts,
  updateProduct as apiUpdate,
} from '../api/productsApi'

type ProductsState = {
  products: Product[]
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => Promise<void>
  updateProduct: (product: Product) => Promise<void>
}

type ProductsStore = ProductsState & {}

const useProductsStore = create<ProductsStore>()(
  persist(
    (set, get): ProductsStore => ({
      products: [],
      setProducts: products => set({ products }),
      addProduct: async product => {
        await apiCreate(product)

        const latest = await fetchProducts()
        set({ products: latest })
      },
      updateProduct: async updatedProduct => {
        const updatedList = get().products.map(p =>
          p.id === updatedProduct.id ? updatedProduct : p
        )
        set({ products: updatedList })
        await apiUpdate(updatedProduct)
      },
    }),
    {
      name: 'products-storage',
    }
  )
)

export { useProductsStore }
