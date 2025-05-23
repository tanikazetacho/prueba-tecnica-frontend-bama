# OPTIMIZACION.md

## Caso de Optimización / Depuración: Renderizado innecesario en tabla editable

### Problema identificado

En una aplicación React, tenía una tabla editable con más de 1000 productos. Al modificar un campo (como nombre o precio), noté que toda la tabla se re-renderizaba, causando una sensación de lentitud al escribir rápido o hacer ediciones múltiples. Esto representaba un riesgo de rendimiento si la tabla crecía.

### ⚖Análisis y diagnóstico

Utilicé las herramientas de React DevTools con el `Profiler`, y comprobé que cada actualización de un campo provocaba la re-renderización completa del componente de lista. Esto se debía a que los inputs estaban embebidos directamente en el componente principal de la página, y no estaban aislados.

### Solución implementada (caso real)

Como estrategia de optimización, extraje cada fila editable en un componente `ProductRow` separado y lo envolví con `React.memo` para evitar renders innecesarios:

```tsx
const ProductRow = React.memo(({ producto, onChange }: Props) => (
  <tr>
    <td>{producto.id}</td>
    <td>
      <input
        value={producto.nombre}
        onChange={e => onChange({ ...producto, nombre: e.target.value })}
      />
    </td>
    {/* ...otros campos */}
  </tr>
))
```

Y en el componente principal:

```tsx
{
  paginated.map(producto => (
    <ProductRow key={producto.id} producto={producto} onChange={updateProduct} />
  ))
}
```

### Métricas antes y después

| Métrica                      | Antes   | Después     |
| ---------------------------- | ------- | ----------- |
| Tiempo de render (200 filas) | \~150ms | \~30ms      |
| Input delay                  | Notable | Instantáneo |
| Uso de CPU en DevTools       | Alto    | Bajo        |

### Lecciones aprendidas

- Extraer componentes y memoizarlos con `React.memo` mejora mucho el rendimiento.
- El profiler de React es una herramienta fundamental para encontrar cuellos de botella.
- No es necesario optimizar prematuramente, pero sí es clave saber cómo y cuándo hacerlo.

### Aplicación en este proyecto

Aunque esta optimización no fue crítica para esta prueba (la tabla tiene menos de 100 elementos), si el sistema crece en volumen o se integra con APIs externas, aplicar `React.memo` por fila sería una mejora directa y sencilla para mantener la fluidez.
