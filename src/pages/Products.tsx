import { useEffect, useState } from 'react'
import { useProductsStore } from '../store/products'
import { CreateProductDialog } from '../components/CreateProductDialog'
import { Pagination } from '../components/Pagination.tsx'
import { fetchProducts } from '../api/productsApi.ts'

const ITEMS_PER_PAGE = 10

const Products = () => {
  const { products, setProducts, updateProduct } = useProductsStore()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      const productos = await fetchProducts()
      setProducts(productos)
      setIsLoading(false)
    }

    loadProducts()
  }, [setProducts])

  const filtered = products.filter(p => {
    const query = search.toLowerCase()

    return (
      p.id.toString().toLowerCase().includes(query) ||
      p.nombre.toLowerCase().includes(query) ||
      p.precio.toString().includes(query) ||
      p.stock.toString().includes(query)
    )
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-center">Productos</h2>
        <CreateProductDialog />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="px-3 py-2 border border-gray-300 rounded w-full max-w-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 bg-white mb-4 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 whitespace-nowrap">ID</th>
              <th className="p-2 whitespace-nowrap">Nombre</th>
              <th className="p-2 whitespace-nowrap">Precio</th>
              <th className="p-2 whitespace-nowrap">Stock</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(p => (
              <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="p-2">{p.id}</td>
                <td className="p-2">
                  <input
                    className="w-full bg-transparent focus:outline-none focus:border-blue-500"
                    value={p.nombre}
                    onChange={e => updateProduct({ ...p, nombre: e.target.value })}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    className="w-full bg-transparent focus:outline-none focus:border-blue-500"
                    value={p.precio}
                    onChange={e =>
                      updateProduct({
                        ...p,
                        precio: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    className="w-full bg-transparent focus:outline-none focus:border-blue-500"
                    value={p.stock}
                    onChange={e =>
                      updateProduct({
                        ...p,
                        stock: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}

export default Products
