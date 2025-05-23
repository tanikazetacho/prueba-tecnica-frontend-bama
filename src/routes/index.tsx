import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAuthStore } from '../store/auth'
import Login from '../pages/Login'
import Products from '../pages/Products'
import Layout from '../components/Layout'

const RedirectToProductos = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({ to: '/productos', replace: true })
  }, [navigate])
  return null
}

const NotFound = () => <div className="p-4 text-center text-red-600">Página no encontrada</div>

const rootRoute = new RootRoute({
  component: () => <Outlet />,
})

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const protectedRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: Layout,
  beforeLoad: async () => {
    const isAuth = useAuthStore.getState().isAuthenticated
    if (!isAuth) throw redirect({ to: '/login' })
  },
})

const rootRedirectRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/',
  component: RedirectToProductos,
})

const productosRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/productos',
  component: Products,
})

const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  protectedRoute.addChildren([
    rootRedirectRoute,
    productosRoute,
  ]),
  notFoundRoute,
])

const router = new Router({
  routeTree,
  basepath: '/prueba-tecnica-frontend-bama',
})

export const Routes = () => <RouterProvider router={router} />