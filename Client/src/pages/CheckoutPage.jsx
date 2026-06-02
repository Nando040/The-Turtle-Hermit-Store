import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/Api'

const CheckoutPage = () => {
    const { cartItems, totalPrice, clearCart, token } = useCart()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        paymentMethod: 'CreditCard'
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        setError(null)

        if (!form.name || !form.email || !form.address) {
            setError('Please fill in all fields')
            setLoading(false)
            return
        }

        const orderData = {
            products: cartItems.map(item => ({
                product_id: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                size: item.selectedSize
            })),
            totalPrice,
            paymentMethod: form.paymentMethod,
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

    return (
        <div>
            <h1>Checkout</h1>

            {/* Order Summary */}
            <div>
                <h2>Order Summary</h2>
                {cartItems.map(item => (
                    <div key={`${item._id}-${item.selectedSize}`}>
                        <span>{item.name} x{item.quantity}</span>
                        <span>{item.price * item.quantity} kr</span>
                    </div>
                ))}
                <h3>Total: {totalPrice} kr</h3>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <h2>Shipping Details</h2>

                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your email"
                    />
                </div>

                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Your address"
                    />
                </div>

                <div>
                    <h2>Payment Method</h2>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="CreditCard"
                            checked={form.paymentMethod === 'CreditCard'}
                            onChange={handleChange}
                        />
                        Credit Card
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Swish"
                            checked={form.paymentMethod === 'Swish'}
                            onChange={handleChange}
                        />
                        Swish
                    </label>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="button" onClick={() => navigate('/cart')}>Back to Cart</button>
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Confirm Order'}
                </button>
            </form>
        </div>
    )
}

export default CheckoutPage