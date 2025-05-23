import { describe, it, expect } from 'vitest'
import { filterProducts } from '../utils/filterProducts'

const mock = [
  { id: '1', nombre: 'Teclado', precio: 200, stock: 10 },
  { id: '2', nombre: 'Mouse', precio: 100, stock: 5 },
  { id: '3', nombre: 'Monitor', precio: 300, stock: 2 },
]

describe('filterProducts', () => {
  it('filtra por nombre', () => {
    const result = filterProducts(mock, 'mouse')
    expect(result).toHaveLength(1)
    expect(result[0].nombre).toBe('Mouse')
  })

  it('filtra por precio', () => {
    const result = filterProducts(mock, '300')
    expect(result[0].nombre).toBe('Monitor')
  })
})
