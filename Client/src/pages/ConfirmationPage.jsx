import { useLocation, useNavigate } from 'react-router-dom'

const ConfirmationPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()

    if (!state?.order) return (
        <div>
            <h1>No order found</h1>
            <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
    )

    const { order, name } = state

    return (
        <div>
            <h1>Order Confirmed!</h1>
            <p>Thank you {name}, your order has been placed!</p>

            <h2>Order Details</h2>
            <p>Order ID: {order._id}</p>
            <p>Payment Method: {order.paymentMethod}</p>
            <p>Shipping Address: {order.shippingAddress}</p>

            <h2>Products</h2>
            {order.products.map((item, index) => (
                <div key={index}>
                    <span>{item.name} x{item.quantity}</span>
                    <span> – {item.price * item.quantity} kr</span>
                </div>
            ))}

            <h2>Total: {order.totalPrice} kr</h2>

            <button onClick={() => navigate('/')}>Back to Home</button>
            <button onClick={() => navigate('/products')}>Continue Shopping</button>
        </div>
    )
}

export default ConfirmationPage