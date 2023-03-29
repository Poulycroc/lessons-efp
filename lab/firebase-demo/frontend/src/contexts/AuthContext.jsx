import React, { useContext, useState, useEffect } from 'react'
import { auth } from './../firebase'

const AuthContext = React.createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login: (e, p) => auth.signInWithEmailAndPassword(e, p)
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
