import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder, getCurrentUser } from '../services/Api'
import './CheckoutPage.css'

const SHIPPING_FEE = 49

const CheckoutPage = () => {
    const { cartItems, totalPrice, clearCart } = useCart()
    const { authed } = useAuth()
    const token = localStorage.getItem('token')
    // här hämtar vi items från localStorage och även token för att kunna skapa order
    // vi har även states för att hantera formuläret och betalningsmetoden
    const navigate = useNavigate()

    const [loggedInUser, setLoggedInUser] = useState(null)
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
    useEffect(() => { // detta är för inloggade användare så att fältet fyll automatiskt i checkout sidan
        const fetchUser = async () => {
            if (!token) return
            try {
                const data = await getCurrentUser(token)
                if (data?.name) {
                    setLoggedInUser(data)
                }
            } catch (err) {
                console.error('Could not fetch user')
            }
        }
        fetchUser()
    }, [token])

    const isLoggedIn = authed && !!loggedInUser

    // Shipping info depending on login status
    const shippingName = isLoggedIn ? (loggedInUser?.name || '–') : (form.name || '–')
    const shippingAddress = isLoggedIn ? (loggedInUser?.address || '–') : (form.address || '–')
    // dessa 2 variabler är det som fyller i vår shipping "boxen" om man är inloggad
    //annars förblir den tom och man får fylla i den själv
    if (cartItems.length === 0) return (
        <div className="checkout-page">
            <div className="checkout-empty">
                <h1>Checkout</h1>
                <p>Your cart is empty</p>
                <button onClick={() => navigate('/products')}>Back to Products</button>
            </div>
        </div>
    )

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        // Validate – guests must fill in fields
        if (!isLoggedIn && (!form.name || !form.email || !form.address)) {
            setError('Please fill in all fields')
            return
        } // Denna är för gäster så det inte går att checka ut utan att fylla i

        setLoading(true)
        
        // Denna visar oss vad vi håller på beställa
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
            shippingAddress: shippingAddress
        }

        try {
            const result = await createOrder(orderData, token)
            if (result._id) {
                clearCart()
                // Denna koden är vad som skickas till ConfirmationPage så vi kan visa vad som
                // man har beställt
                navigate('/confirmation', { state: { order: result, name: shippingName } })
            } else {
                setError('Something went wrong, please try again')
            }
        } catch (err) {
            setError('Could not create order')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="checkout-page">

            {/* Background layer */}
            <div className="checkout-background" />

            <form className="checkout-content" onSubmit={handleSubmit}>

                {/* ── LEFT COLUMN ── */}
                <div className="checkout-left">
                    <h1 className="checkout-title">Checkout</h1>

                    {/* Input form – disabled and dimmed when logged in */}{/* Här så ville jag att man inte
                    skulle kunna fylla i om man är inloggad och i css, så fälten blir "dimmiga" men är 
                    man gäst så kan man fylla i dem */}
                    <div className={`checkout-form ${isLoggedIn ? 'logged-in' : 'guest'}`}>
                        <div className="checkout-field">
                            <label>Full name</label>
                            <input
                                type="text"
                                name="name"
                                value={isLoggedIn ? loggedInUser?.name || '' : form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                disabled={isLoggedIn}
                            />
                        </div>
                        <div className="checkout-field">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={isLoggedIn ? loggedInUser?.email || '' : form.email}
                                onChange={handleChange}
                                placeholder="Your email"
                                disabled={isLoggedIn}
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
                                disabled={isLoggedIn}
                            />
                        </div>
                        <div className="checkout-field">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={isLoggedIn ? loggedInUser?.address || '' : form.address}
                                onChange={handleChange}
                                placeholder="Your address"
                                disabled={isLoggedIn}
                            />
                        </div>
                    </div>

                    {/* Shipping to block – updates dynamically */}
                    <div className="shipping-card">
                        <p className="shipping-card-title">Shipping to</p>
                        <p>{shippingAddress}</p>
                        <p className="shipping-card-name">Name: {shippingName}</p>
                    </div>

                    {/* Payment method block */}{/* Som det står här, här väljer man betalningsmetod */}
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