import { createContext, useContext, useState } from 'react'
// Detta är states createContext är det som gör en globalt state dvs användas i heala appen
// useContext är det som hämtar data från createContext
const saveToken = (token) => localStorage.setItem('token', token)
const removeToken = () => localStorage.removeItem('token')
const isAuthenticated = () => !!localStorage.getItem('token')

const AuthContext = createContext(null)
// Detta är "lådan" som håller all data som har med login och logout för usern att göra

export const AuthProvider = ({ children }) => {
    const [authed, setAuthed] = useState(isAuthenticated())
// Detta är vad vi(logiken) skriver in i vår Main.jsx när vi ska använda AuthProvider
// det är det som gör att vi kan använda login och logout funktionerna i hela appen
    const login = (token) => {
        saveToken(token)
        setAuthed(true)
    }
    //skapar en token i localStorage

    const logout = () => {
        removeToken() // Detta är det som loggar ut oss genom att ta bort token från localStorage
        // Jag insåg senare att skapa en logout funktion i min backend var onödigt efter denna.
        setAuthed(false)
    }

    return (
        <AuthContext.Provider value={{ authed, login, logout }}>
            {children}
        </AuthContext.Provider>
    )// Detta är vad vi returnerar in i vår Main.jsx
}

export const useAuth = () => useContext(AuthContext)