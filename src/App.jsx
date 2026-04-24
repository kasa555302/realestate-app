// App.jsx — root component that sets up routing and auth context
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Properties from './pages/Properties'

export default function App() {
  return (
    // AuthProvider wraps everything so all pages can access the session
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes — accessible without login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected route — redirects to /login if not authenticated */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Properties />
              </PrivateRoute>
            }
          />

          {/* Any unknown path redirects to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
