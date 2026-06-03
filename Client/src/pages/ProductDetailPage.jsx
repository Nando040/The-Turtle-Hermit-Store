import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/Api'
import { useCart } from '../context/CartContext'
import './ProductDetailPage.css'

// Dynamic background based on category
const categoryBackgrounds = {
    'Protection/Skydd': '/images/categories/Protection.jpg',
    'Karate': '/images/categories/Karate.jpg',
    'Thai/Kickbox': '/images/categories/Thaibox.jpg',
    'BJJ/Judo': '/images/categories/BjjJudo.jpg',
}

const ProductDetailPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedSize, setSelectedSize] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id)
                setProduct(data)
                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSize(data.sizes[0])
                }
            } catch (err) {
                setError('Could not fetch product')
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart({ ...product, selectedSize })
        }
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    if (loading) return <p className="detail-status">Loading...</p>
    if (error) return <p className="detail-status">{error}</p>
    if (!product) return <p className="detail-status">Product not found</p>

    // Pick background based on category, fallback to default
    const bgImage = categoryBackgrounds[product.category] || '/images/hero/goku-section.png'

    return (
        <div className="detail-page">

            {/* Dynamic background layer */}
            <div
                className="detail-background"
                style={{ backgroundImage: `url(${bgImage})` }}
            />

            {/* Content above background */}
            <div className="detail-content">

                {/* ── LEFT COLUMN ── */}
                <div className="detail-left">
                    <h1 className="detail-title">{product.name}</h1>

                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="detail-img"
                    />

                    {/* Color block – only if product.color exists */}
                    {product.color && (
                        <div className="detail-color-block">
                            <span className="detail-color-label">{product.color}</span>
                        </div>
                    )}

                    {/* Size + quantity row */}
                    <div className="detail-controls">
                        {/* Quantity controls */}
                        <div className="detail-qty">
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            >
                                –
                            </button>
                            <span className="qty-count">{quantity}</span>
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(q => q + 1)}
                            >
                                +
                            </button>
                        </div>

                        {/* Size block – only if sizes exist */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="detail-sizes">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'size-btn--active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="detail-actions">
                        <button className="detail-btn-add" onClick={handleAddToCart}>
                            {added ? 'Added ✓' : 'Add to cart'}
                        </button>
                        <button className="detail-btn-cart" onClick={() => navigate('/cart')}>
                            Go to cart
                        </button>
                    </div>
                </div>

                {/* ── RIGHT COLUMN ── */}
                <div className="detail-right">
                    {/* Description */}
                    {product.description && (
                        <div className="detail-description">
                            <h2 className="detail-section-title">Description:</h2>
                            <p>{product.description}</p>
                        </div>
                    )}

                    {/* Product details list */}
                    {product.details && product.details.length > 0 && (
                        <div className="detail-info">
                            <h2 className="detail-section-title">Product details:</h2>
                            <ul className="detail-info-list">
                                {product.details.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ProductDetailPage