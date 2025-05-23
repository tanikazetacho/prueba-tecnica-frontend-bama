# THEORY_FE.md

## 1. Diferencias entre `useMemo` y `useCallback`

`useMemo` guarda el resultado de una función para no volver a calcularlo si las dependencias no cambian. `useCallback` guarda una función para que no se vuelva a crear en cada render. En proyectos con Vite donde el desarrollo es rápido, ayudan a evitar renders innecesarios: `useCallback` se usa cuando pasas funciones a componentes hijos, y `useMemo` para listas filtradas o valores calculados.

## 2. Cómo Zustand maneja estado global sin Context API

Zustand crea una función de estado que puedes importar en cualquier parte del código. No necesita `Context` ni envolver componentes. Esto lo hace más sencillo de usar y más fácil de organizar en apps con muchas pantallas.

## 3. Accesibilidad y consistencia con Radix UI

Radix UI ya incluye accesibilidad en sus componentes: por ejemplo, se puede navegar con teclado, el enfoque está bien controlado, y los elementos se leen correctamente con lectores de pantalla. Es ideal cuando haces diseño por componentes pequeños porque puedes combinarlos sin perder estilo o accesibilidad.

## 4. Estrategias para evitar FOUC con Vite y Radix

- Usar Tailwind directamente en las clases
- Evitar cargar estilos con JavaScript
- Colocar los estilos importantes al inicio en el HTML
- Cargar las fuentes y estilos lo antes posible
- No usar `@import` dentro de los componentes

## 5. Paso mínimo para despliegue blue-green en S3 + CloudFront
