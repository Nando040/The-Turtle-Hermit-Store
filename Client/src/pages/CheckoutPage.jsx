import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder, getCurrentUser } from '../services/Api'
import './CheckoutPage.css'

const SHIPPING_FEE = 49

const CheckoutPage = () => {
    const { cartItems, totalPrice, clearCart } = useCart()
    const { authed, token } = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    })
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('CreditCard')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    // Fetch logged in user data if token exists
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return
            try {
                const data = await getCurrentUser(token)
                if (data?.name) {
                    setUser(data)
                    setForm(prev => ({
                        ...prev,
                        name: data.name || '',
                        email: data.email || '',
                        address: data.address || '',
                    }))
                }
            } catch (err) {
                console.error('Could not fetch user')
            }
        }
        fetchUser()
    }, [token])

    if (cartItems.length === 0) return (
        <div>
            <h1>Checkout</h1>
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/products')}>Back to Products</button>
        </div>
    )

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!form.name || !form.email || !form.address) {
            setError('Please fill in all fields')
            return
        }

        setLoading(true)

        const orderData = {
            products: cartItems.map(item => ({
                product_id: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                size: item.selectedSize
            })),
            totalPrice: totalPrice + SHIPPING_FEE,
            paymentMethod: selectedPaymentMethod,
            shippingAddress: form.address
        }

        try {
            const result = await createOrder(orderData, token)
            if (result._id) {
                clearCart()
                navigate('/confirmation', { state: { order: result, name: form.name } })
            } else {
                setError('Something went wrong, please try again')
            }
        } catch (err) {
            setError('Could not create order')
        } finally {
            setLoading(false)
        }
    }

    const isLoggedIn = !!token && !!user

    return (
        <div className="checkout-page">

            {/* Background layer */}
            <div className="checkout-background" />

            <form className="checkout-content" onSubmit={handleSubmit}>

                {/* ── LEFT COLUMN ── */}
                <div className="checkout-left">
                    <h1 className="checkout-title">Checkout</h1>

                    {/* Input form */}
                    <div className={`checkout-form ${isLoggedIn ? 'logged-in' : ''}`}>
                        <div className="checkout-field">
                            <label>Full name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                            />
                        </div>
                        <div className="checkout-field">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Your email"
                            />
                        </div>
                        <div className="checkout-field">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Your phone number"
                            />
                        </div>
                        <div className="checkout-field">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Your address"
                            />
                        </div>
                    </div>

                    {/* Shipping to block */}
                    <div className="shipping-card">
                        <p className="shipping-card-title">Shipping to</p>
                        {isLoggedIn ? (
                            <>
                                <p>{form.address || '–'}</p>
                                <p className="shipping-card-name">Name: {form.name}</p>
                            </>
                        ) : (
                            <>
                                <p>{form.address || '–'}</p>
                                <p className="shipping-card-name">Name: {form.name || '–'}</p>
                            </>
                        )}
                    </div>

                    {/* Payment method block */}
                    <div className="payment-card">
                        <h2 className="payment-title">Payment method</h2>
                        <div
                            className={`payment-option ${selectedPaymentMethod === 'CreditCard' ? 'selected' : ''}`}
                            onClick={() => setSelectedPaymentMethod('CreditCard')}
                        >
                            <img src="/images/hero/KreditkortIcon.png" alt="Credit Card" className="payment-icon" />
                            <span>CreditCard</span>
                        </div>
                        <div
                            className={`payment-option ${selectedPaymentMethod === 'Swish' ? 'selected' : ''}`}
                            onClick={() => setSelectedPaymentMethod('Swish')}
                        >
                            <img src="/images/hero/SwishIcon.jpg" alt="Swish" className="payment-icon" />
                            <span>Swish</span>
                        </div>
                    </div>

                    {error && <p className="checkout-error">{error}</p>}
                    <button type="button" className="back-btn" onClick={() => navigate('/cart')}>
                        Back to Cart
                    </button>
                </div>

                {/* ── RIGHT COLUMN ── */}
                <div className="checkout-right">
                    <div className="order-summary">
                        <h2 className="order-summary-title">Order Summary</h2>

                        <table className="order-summary-table">
                            <thead>
                                <tr>
                                    <th>Products</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={`${item._id}-${item.selectedSize}`}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price * item.quantity} kr</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>Shipping</td>
                                    <td></td>
                                    <td>{SHIPPING_FEE} kr</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="order-total">
                        <span className="order-total-label">Total:</span>
                        <span className="order-total-price">{totalPrice + SHIPPING_FEE} kr</span>
                    </div>

                    <button type="submit" className="confirm-order-button" disabled={loading}>
                        {loading ? 'Processing...' : 'Confirm Order'}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default CheckoutPage