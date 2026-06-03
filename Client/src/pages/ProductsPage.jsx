import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../services/Api'
import { useCart } from '../context/CartContext'
import './ProductsPage.css'

// Category background image mapping
const categoryBackgrounds = {
    'All': '/images/hero/goku-section.png',
    'Protection/Skydd': '/images/categories/Protection.jpg',
    'Karate': '/images/categories/Karate.jpg',
    'Thai/Kickbox': '/images/categories/Thaibox.jpg',
    'BJJ/Judo': '/images/categories/BjjJudo.jpg',
}

// Category display data with images
const categories = [
    { name: 'Protection/Skydd', image: '/images/categories/Protection.jpg' },
    { name: 'Karate', image: '/images/categories/Karate.jpg' },
    { name: 'Thai/Kickbox', image: '/images/categories/Thaibox.jpg' },
    { name: 'BJJ/Judo', image: '/images/categories/BjjJudo.jpg' },
]

const ProductsPage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [added, setAdded] = useState(null)
    const navigate = useNavigate()
    const { addToCart } = useCart()

    const handleAddToCart = (e, product) => {
        e.stopPropagation()
        addToCart({ ...product, selectedSize: product.sizes?.[0] || 'One Size' })
        setAdded(product._id)
        setTimeout(() => setAdded(null), 2000)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data)
            } catch (err) {
                setError('Could not fetch products')
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    // Filter products based on selected category
    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory)

    if (loading) return <p>Loading products...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="products-page">

            {/* Dynamic background layer with opacity */}
            <div
                className="products-background"
                style={{ backgroundImage: `url(${categoryBackgrounds[selectedCategory]})` }}
            />

            {/* All content sits above background */}
            <div className="products-content">

                {/* Category filter header */}
                <div className="category-filter">
                    <h2 className="category-title">Choose your style</h2>
                    <button
                        className="show-all-button"
                        onClick={() => setSelectedCategory('All')}
                    >
                        Show all
                    </button>
                </div>

                {/* Category cards */}
                <div className="category-cards">
                    {categories.map(cat => (
                        <div
                            key={cat.name}
                            className={`category-card ${selectedCategory === cat.name ? 'category-card--active' : ''}`}
                            onClick={() => setSelectedCategory(cat.name)}
                        >
                            <img src={cat.image} alt={cat.name} className="category-card-img" />
                            <p className="category-card-name">{cat.name}</p>
                        </div>
                    ))}
                </div>

                {/* Products grid */}
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <div
                            key={product._id}
                            className="product-card"
                            onClick={() => navigate(`/products/${product._id}`)}
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-card-img"
                            />
                            <div className="product-card-info">
                                <p className="product-card-name">{product.name}</p>
                                <p className="product-card-price">{product.price} kr</p>
                                <p className="product-card-size">{product.sizes?.[0]}</p>
                                <button
                                    className="product-card-btn"
                                    onClick={(e) => handleAddToCart(e, product)}
                                >
                                    {added === product._id ? 'Added ✓' : 'Add to cart'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default ProductsPage