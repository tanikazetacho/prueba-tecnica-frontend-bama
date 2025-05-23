import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  isAuthenticated: boolean
  email: string | null
  login: (email: string) => void
  logout: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set): AuthState => ({
      isAuthenticated: false,
      email: null,
      login: email => set({ isAuthenticated: true, email }),
      logout: () => set({ isAuthenticated: false, email: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export { useAuthStore }
