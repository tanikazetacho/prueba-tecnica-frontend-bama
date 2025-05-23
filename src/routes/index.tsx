import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { useAuthStore } from '../store/auth'
import Login from '../pages/Login'
import Products from '../pages/Products'
import Layout from '../components/Layout'
import { useEffect } from 'react'

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

const RedirectToProductos = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({ to: '/productos', replace: true })
  }, [navigate])
  return null
}

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

const routeTree = rootRoute.addChildren([
  loginRoute,
  protectedRoute.addChildren([rootRedirectRoute, productosRoute]),
])

const router = new Router({ routeTree })

export const Routes = () => <RouterProvider router={router} />
