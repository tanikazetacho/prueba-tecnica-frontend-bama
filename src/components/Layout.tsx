import { Link, Outlet, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../store/auth'

const Layout = () => {
  const logout = useAuthStore(s => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/login', replace: true })
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="w-full md:w-64 bg-gray-900 text-white p-4">
        <div className="text-lg font-bold mb-6 flex items-center gap-2">
          <span className="text-green-400 text-xl">🧪️</span>
          <span className="text-center">
            Prueba Técnica
            <br />
            BAMA
          </span>
        </div>
        <nav className="flex flex-col gap-3">
          <Link
            to="/productos"
            className="[&.active]:font-bold hover:underline transition flex items-center gap-2"
          >
            📦 Productos
          </Link>
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
          >
            Cerrar sesión
          </button>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50 p-4">
        <div className="bg-white shadow rounded p-4 mb-4 border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Bienvenid@ ...</h1>
          <p className="text-sm text-gray-500">A la aplicación de gestión de productos</p>
          <p className="text-sm text-gray-600 mt-1">
            Sesión iniciada como{' '}
            <span className="text-blue-600 font-medium">{useAuthStore.getState().email}</span>
          </p>
        </div>

        <Outlet />
      </main>
    </div>
  )
}

export default Layout
