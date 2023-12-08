import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const password = localStorage.getItem('password')
  const username = localStorage.getItem('username')

  const isAuth = password && username

  if (!isAuth) return <Navigate to='/login' />

  return children
}
