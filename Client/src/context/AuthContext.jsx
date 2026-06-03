import { createContext, useContext, useState } from 'react'

// Helper functions for token management
const saveToken = (token) => localStorage.setItem('token', token)
const removeToken = () => localStorage.removeItem('token')
const isAuthenticated = () => !!localStorage.getItem('token')

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [authed, setAuthed] = useState(isAuthenticated())

    const login = (token) => {
        saveToken(token)
        setAuthed(true)
    }

    const logout = () => {
        removeToken()
        setAuthed(false)
    }

    return (
        <AuthContext.Provider value={{ authed, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)