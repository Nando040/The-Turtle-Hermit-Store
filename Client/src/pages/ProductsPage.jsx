import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../services/Api'
import './ProductsPage.css'
import { useCart } from '../context/CartContext'

// Category background image mapping
const categoryBackgrounds = {
    'All': '/images/hero/goku-section.png',
    'Protection': '/images/categories/Protection.jpg',
    'Karate': '/images/categories/Karate.jpg',
    'Thai/Kickbox': '/images/categories/Thaibox.jpg',
    'BJJ/Judo': '/images/categories/BjjJudo.jpg',
}
// Variabler som gör det lätt att filtrera produkter när 
// man skapat logik för de olika kategorierna i backend och frontend.
// Mitt syfte var att bakgrunden skulle ändras till kategorin man väljer.
// Category display data with images
const categories = [
    { name: 'Protection', image: '/images/categories/Protection.jpg' },
    { name: 'Karate', image: '/images/categories/Karate.jpg' },
    { name: 'Thai/Kickbox', image: '/images/categories/Thaibox.jpg' },
    { name: 'BJJ/Judo', image: '/images/categories/BjjJudo.jpg' },
]

const ProductsPage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const navigate = useNavigate()
    const { addToCart } = useCart()
    // Här är alla states som vi använder i denna sidan, den täcker 
    // alla funktioner och även designen som vi har i denna sidan

    useEffect(() => { // här börjar vi bygga logiken för att använda states
        const fetchProducts = async () => {
            try {
                const data = await getProducts() // här hämtar vi alla produkter från backend
                // vi tillkallar vår getProducts från api.js
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
    const filteredProducts = selectedCategory === 'All' // Här är logiken för att filtrera 
    // produkter baserat på vilken kategori vi använder det senare i vår return det som vi ser i sidan.
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
            /> {/* Här är logiken för att ändra bakgrundsbilden baserat på vilken kategori vi har valt */}
            {/* som vi nämner där uppe är det här bakgrundsbilden filtreras. */}

            {/* All content sits above background */}
            <div className="products-content">

                {/* Category filter header */}
                <div className="category-filter">
                    <h2 className="category-title">Choose your style</h2>
                    <button
                        className="show-all-button"
                        onClick={() => setSelectedCategory('All')}
                    >{/* Vår knapp som visar alla produkter */}
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

                {/* Products grid */} {/*Det här är "magiken" sker runt produkterna 
                Vi ser till att själva kortet tar oss till produktsidan men lägger även till 
                en knapp i botten av kortet som gör att vi kan handla. Hade gått att finslipa mycket mer
                 men detta var det jag hann med och det liknar lite min figma.*/}
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
                            </div>

                            <button className="product-card-add-button" onClick={(e) => {
                                e.stopPropagation()
                                addToCart(product)
                            }}>
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default ProductsPage
