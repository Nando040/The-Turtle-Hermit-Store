import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartPage.css'

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()
    const navigate = useNavigate()

    if (cartItems.length === 0) return (
        <div className="cart-empty">
            <h1>Shopping Cart</h1>
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/products')}>Back to Products</button>
        </div>
    )

    return (
        <div className="cart-page">

            {/* Background layer behind everything */}
            <div className="cart-background" />

            {/* All content above background */}
            <div className="cart-content">
                <h1 className="cart-title">Shopping Cart</h1>

                {/* Header row */}
                <div className="cart-header">
                    <span className="cart-header-product">Product</span>
                    <span className="cart-header-price">Price</span>
                    <span className="cart-header-quantity">Quantity</span>
                    <span className="cart-header-total">Total</span>
                </div>

                {/* Cart items */}
                {cartItems.map(item => (
                    <div key={`${item._id}-${item.selectedSize}`} className="cart-row">

                        {/* Product info */}
                        <div className="cart-row-product">
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="cart-row-img"
                            />
                            <div className="cart-row-info">
                                <p className="cart-row-name">{item.name}</p>
                                <p className="cart-row-color">Colo: White</p>
                                <p className="cart-row-size">Size: {item.selectedSize}</p>
                            </div>
                        </div>

                        {/* Price */}
                        <span className="cart-row-price">{item.price}kr</span>

                        {/* Quantity controls */}
                        <div className="cart-row-quantity">
                            <button
                                className="qty-btn"
                                onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity - 1)}
                            >
                                –
                            </button>
                            <span className="qty-count">{item.quantity}</span>
                            <button
                                className="qty-btn"
                                onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity + 1)}
                            >
                                +
                            </button>
                        </div>

                        {/* Total per item */}
                        <span className="cart-row-total">{item.price * item.quantity}kr</span>

                        {/* Remove button */}
                        <button
                            className="cart-row-remove"
                            onClick={() => removeFromCart(item._id, item.selectedSize)}
                        >
                            ✕
                        </button>

                    </div>
                ))}

                {/* Subtotal box */}
                <div className="cart-subtotal">
                    <span className="cart-subtotal-label">Sub total:</span>
                    <span className="cart-subtotal-price">{totalPrice}kr</span>
                </div>

                {/* Action buttons */}
                <div className="cart-actions">
                    <button className="cart-btn-back" onClick={() => navigate('/products')}>
                        Back to Products
                    </button>
                    <button className="cart-btn-checkout" onClick={() => navigate('/checkout')}>
                        Go to Checkout
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CartPage