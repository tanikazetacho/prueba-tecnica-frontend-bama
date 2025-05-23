import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useProductsStore } from '../store/products'

export const CreateProductDialog = () => {
  const addProduct = useProductsStore(s => s.addProduct)
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (!nombre || !precio || !stock) return

    addProduct({
      id: crypto.randomUUID(),
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    })

    setNombre('')
    setPrecio('')
    setStock('')
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Crear producto
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-6 rounded shadow w-[90%] max-w-sm sm:w-96">
          <Dialog.Title className="text-lg font-bold mb-4">Nuevo producto</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-4">
            Completa los campos para agregar un nuevo producto a la tabla.
          </Dialog.Description>
          <input
            className="w-full mb-2 border rounded p-2"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
          <input
            type="number"
            className="w-full mb-2 border rounded p-2"
            placeholder="Precio"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
          />
          <input
            type="number"
            className="w-full mb-4 border rounded p-2"
            placeholder="Stock"
            value={stock}
            onChange={e => setStock(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Dialog.Close className="px-4 py-2 bg-gray-100 rounded w-full sm:w-auto">
              Cancelar
            </Dialog.Close>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
              onClick={handleSubmit}
            >
              Guardar
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
