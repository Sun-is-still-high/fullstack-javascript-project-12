import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { appRoutes, apiRoutes } from '../routes'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    return token ? { username, token } : null
  })

  const saveUser = useCallback((userData) => {
    localStorage.setItem('token', userData.token)
    localStorage.setItem('username', userData.username)
    setUser(userData)
    navigate(appRoutes.chat)
  }, [navigate])

  const logIn = useCallback(async (credentials) => {
    const response = await api.post(apiRoutes.login, credentials)
    const { token, username } = response.data
    saveUser({ token, username })
  }, [saveUser])

  const signUp = useCallback(async ({ username, password }) => {
    const response = await api.post(apiRoutes.signup, { username, password })
    const { token, username: name } = response.data
    saveUser({ token, username: name })
  }, [saveUser])

  const logOut = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setUser(null)
    navigate(appRoutes.login)
  }, [navigate])

  const value = useMemo(() => ({
    user,
    logIn,
    signUp,
    logOut,
  }), [user, logIn, signUp, logOut])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
