import { createContext, useContext, useState, useEffect } from 'react'
// Här skapar vi våra states denna har lite mer än AuthContext eftersom den har mer funktioner
// t.ex så har vi useEffect som gör att varje gång cartItems ändras så sparas det i localStorage
// Jag fick lära mig det genom att alla mina items försvann varje gång jag refreshade sidan,

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem('cartItems')
            return stored ? JSON.parse(stored) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

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
    // Dessa functioner har inget med mina routes från backend att göra det är bara för hantera localStorage och cartItems state i frontend
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

    const clearCart = () => {
        setCartItems([])
        localStorage.removeItem('cartItems')
    }

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