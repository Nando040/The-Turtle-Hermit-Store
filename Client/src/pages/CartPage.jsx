import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()
    const navigate = useNavigate()

    if (cartItems.length === 0) return (
        <div>
            <h1>Shopping Cart</h1>
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/products')}>Back to Products</button>
        </div>
    )

    return (
        <div>
            <h1>Shopping Cart</h1>

            {cartItems.map(item => (
                <div key={`${item._id}-${item.selectedSize}`}>
                    <img src={item.imageUrl} alt={item.name} width="100" />
                    <h3>{item.name}</h3>
                    <p>Size: {item.selectedSize}</p>
                    <p>Price: {item.price} kr</p>

                    {/* Antal */}
                    <div>
                        <button onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity + 1)}>+</button>
                    </div>

                    <p>Total: {item.price * item.quantity} kr</p>

                    <button onClick={() => removeFromCart(item._id, item.selectedSize)}>
                        Remove
                    </button>
                </div>
            ))}

            <h2>Subtotal: {totalPrice} kr</h2>

            <button onClick={() => navigate('/products')}>Continue Shopping</button>
            <button onClick={() => navigate('/checkout')}>Go to Checkout</button>
        </div>
    )
}

export default CartPage