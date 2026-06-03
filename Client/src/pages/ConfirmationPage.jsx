import { useLocation, useNavigate } from 'react-router-dom'
import './ConfirmationPage.css'

const ConfirmationPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()

    if (!state?.order) return (
        <div className="confirmation-page">
            <div className="confirmation-background" />
            <div className="confirmation-content">
                <h1 className="confirmation-title">Order Confirmation</h1>
                <div className="confirmation-card">
                    <h2>No order found</h2>
                    <button className="confirm-btn-home" onClick={() => navigate('/')}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    )

    const { order, name } = state

    return (
        <div className="confirmation-page">

            {/* Background layer */}
            <div className="confirmation-background" />

            {/* Content above background */}
            <div className="confirmation-content">
                <h1 className="confirmation-title">Order Confirmation</h1>

                {/* Confirmation card */}
                <div className="confirmation-card">
                    <h2 className="confirmation-card-title">Order Confirmed!</h2>
                    <p className="confirmation-thankyou">
                        Thank you {name || 'valued customer'}, your order has been placed!
                    </p>

                    {/* Order details */}
                    <div className="confirmation-details">
                        <h3 className="confirmation-details-title">Order Details</h3>
                        <p>Order ID: {order._id || '–'}</p>
                        <p>Payment Method: {order.paymentMethod || '–'}</p>
                        <p>Shipping Address: {order.shippingAddress || '–'}</p>
                    </div>

                    {/* Products list */}
                    {order.products && order.products.length > 0 && (
                        <div className="confirmation-products">
                            <h3 className="confirmation-details-title">Products</h3>
                            {order.products.map((item, index) => (
                                <p key={index} className="confirmation-product-row">
                                    {item.name || 'Product'} x{item.quantity || 1} – {(item.price || 0) * (item.quantity || 1)} kr
                                </p>
                            ))}
                        </div>
                    )}

                    <p className="confirmation-total">
                        Total: {order.totalPrice || '–'} kr
                    </p>
                </div>

                {/* Action buttons */}
                <div className="confirmation-actions">
                    <button className="confirm-btn-home" onClick={() => navigate('/')}>
                        Back to Home
                    </button>
                    <button className="confirm-btn-shop" onClick={() => navigate('/products')}>
                        Continue Shopping
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ConfirmationPage