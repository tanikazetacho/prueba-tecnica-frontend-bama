# README.md

## 🚀 Prueba Técnica Front-End - React + Vite + Zustand

Este proyecto es una prueba técnica que implementa una SPA usando React, Vite, Zustand, TanStack Router y Radix UI. Cumple con los requisitos de autenticación simulada, rutas protegidas, tabla editable de productos, formularios y pruebas unitarias.

---

## 📆 Tecnologías principales

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Zustand](https://zustand-demo.pmnd.rs/)
* [TanStack Router](https://tanstack.com/router)
* [Radix UI](https://www.radix-ui.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Vitest](https://vitest.dev/)
* [Prettier](https://prettier.io/)

---

## ⚡️ Requisitos del entorno

* Node.js v18 o superior
* npm 9+ o yarn 1.22+

> **Nota:** No se usó Tailwind CSS v4 porque presentaba errores de compatibilidad con PostCSS y Vite en este entorno. Se optó por usar Tailwind CSS v3.4.1, que funciona correctamente con configuración clásica (`tailwind.config.js`, `postcss.config.js`).

---

## 🚪 Instalación

```bash
yarn install
```

---

## 🔄 Desarrollo local

```bash
yarn dev
```

La app está disponible en `http://localhost:5173`

---

## 🔺 Scripts disponibles

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "format": "prettier --write ."
}
```

---

## 💡 Funcionalidades

* Login simulado con Zustand persistente
* Rutas protegidas con TanStack Router
* Tabla editable de productos con paginación y búsqueda
* Creación de productos desde modal con validación
* Peticiones simuladas con `fetch` sobre `localStorage`
* Test unitarios con Vitest
* Estilos responsive con Tailwind + Radix

---

## 🎨 Formato de código con Prettier

Este proyecto usa `prettier` para mantener un estilo de código consistente. La configuración utilizada se encuentra en `prettier.config.js` y se basa en:

```js
{
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 100,
  arrowParens: 'avoid',
  endOfLine: 'auto'
}
```

Puedes formatear el proyecto con:

```bash
yarn format
```

---

## 🔬 Pruebas unitarias

```bash
yarn test
```

Se usa Vitest para probar funciones puras como el filtrado de productos.

---

## 🖐 Entregables adicionales

* `OPTIMIZACION.md`: Caso real de optimización
* `SOFTSKILLS.md`: Respuesta al escenario con el Product Owner
* `THEORY_FE.md`: Preguntas teóricas respondidas

---

> Proyecto creado con `yarn create vite` y adaptado a las necesidades de la prueba técnica.
