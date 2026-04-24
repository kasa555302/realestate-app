// PrivateRoute redirects unauthenticated users to /login.
// Wrap any page that requires login with this component.
import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function PrivateRoute({ children }) {
  const { session } = useAuth()

  // Still checking session — render nothing to avoid a flash of the wrong screen
  // (セッション確認中は何も表示しない)
  if (session === undefined) return null

  // If no session, redirect to login page
  if (!session) return <Navigate to="/login" replace />

  return children
}
