import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../store/auth'
import * as Label from '@radix-ui/react-label'
import { useState } from 'react'

const Login = () => {
  const login = useAuthStore(s => s.login)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleLogin = () => {
    if (!email) return
    login(email)
    navigate({ to: '/' })
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar sesión</h1>

        <div className="mb-5">
          <Label.Root htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </Label.Root>
          <input
            id="email"
            type="email"
            placeholder="tucorreo@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  )
}

export default Login
