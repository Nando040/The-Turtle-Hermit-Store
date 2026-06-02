import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/Api'
import { useCart } from '../context/CartContext'

const ProductDetailPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedSize, setSelectedSize] = useState('')
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
        addToCart({ ...product, selectedSize })
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }


    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!product) return <p>Product not found</p>

    return (
        <div>
            <button onClick={() => navigate('/products')}>← Back</button>

            <img src={product.imageUrl} alt={product.name} width="200" />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price} kr</p>
            <p>{product.category}</p>

            {product.sizes && product.sizes.length > 0 && (
                <div>
                    <label>Size: </label>
                    {product.sizes.map(size => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            style={{ fontWeight: selectedSize === size ? 'bold' : 'normal' }}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            )}

            <button onClick={handleAddToCart}>
                {added ? 'Added to cart! ✓' : 'Add to cart'}
            </button>

            <button onClick={() => navigate('/cart')}>
                Go to cart
            </button>
        </div>
    )
}

export default ProductDetailPage