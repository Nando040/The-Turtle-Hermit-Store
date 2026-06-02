import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || null)

    // Lägg till produkt i cart
    const addToCart = (product) => {
        setCartItems(prev => {
            const exists = prev.find(item => 
                item._id === product._id && item.selectedSize === product.selectedSize
            )
            if (exists) {
                return prev.map(item =>
                    item._id === product._id && item.selectedSize === product.selectedSize
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    // Ta bort produkt från cart
    const removeFromCart = (productId, selectedSize) => {
        setCartItems(prev => prev.filter(item => 
            !(item._id === productId && item.selectedSize === selectedSize)
        ))
    }

    // Ändra antal
    const updateQuantity = (productId, selectedSize, quantity) => {
        if (quantity < 1) return
        setCartItems(prev => prev.map(item =>
            item._id === productId && item.selectedSize === selectedSize
                ? { ...item, quantity }
                : item
        ))
    }

    // Töm cart
    const clearCart = () => setCartItems([])

    // Logga in – spara token
    const login = (newToken) => {
        setToken(newToken)
        localStorage.setItem('token', newToken)
    }

    // Logga ut
    const logout = () => {
        setToken(null)
        localStorage.removeItem('token')
    }

    // Räkna antal produkter i cart
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

    // Räkna totalpris
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            token,
            login,
            logout,
            cartCount,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)