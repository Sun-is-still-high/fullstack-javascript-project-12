import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { appRoutes } from '../routes'

const PrivateRoute = () => {
  const auth = useAuth()

  return auth.user ? <Outlet /> : <Navigate to={appRoutes.login} />
}

export default PrivateRoute
