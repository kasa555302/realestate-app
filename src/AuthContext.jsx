// AuthContext provides the current user session to all child components.
// Any component wrapped in AuthProvider can read `session` via useAuth().
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // session: null means not logged in; object means logged in
  const [session, setSession] = useState(undefined) // undefined = still loading

  useEffect(() => {
    // Get the current session when the app first loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for login / logout events and update state automatically
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // Clean up the listener when this component unmounts
    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ session }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — components call useAuth() instead of useContext(AuthContext) directly
export function useAuth() {
  return useContext(AuthContext)
}
