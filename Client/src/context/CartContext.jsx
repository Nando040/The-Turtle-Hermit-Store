import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

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

    const removeFromCart = (productId, selectedSize) => {
        setCartItems(prev => prev.filter(item =>
            !(item._id === productId && item.selectedSize === selectedSize)
        ))
    }

    const updateQuantity = (productId, selectedSize, quantity) => {
        if (quantity < 1) return
        setCartItems(prev => prev.map(item =>
            item._id === productId && item.selectedSize === selectedSize
                ? { ...item, quantity }
                : item
        ))
    }

    const clearCart = () => setCartItems([])

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)