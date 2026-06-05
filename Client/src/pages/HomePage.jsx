import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import heroImg from '../../public/images/hero/goku-hero.png'
import sectionImg from '../../public/images/hero/goku-section.png'
import { getProducts } from '../services/Api'
import { useCart } from '../context/CartContext'
import './HomePage.css'

const HomePage = () => {
    const navigate = useNavigate()
    // Den skickar oss till en annan sida när vi klickar på knapparna i hero sektionen
    const { addToCart } = useCart()
    //hämtar vi cartContext och tar ut addToCart till popular sektionen
    const [products, setProducts] = useState([])
    // Med denna så vet vår sida vad som ska visas i popular sektionen
    const [added, setAdded] = useState(null)
    // detta bekräftar när vi lagt en produkt i vår kundvagn

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data.slice(0, 4))
            } catch (err) {
                console.error('Could not fetch products')
            }
        }
        fetchProducts()
    }, []) // denna hämtar produkter från backend(databasen) och har try/catch 
    // ifall den inte lyckas hämta produkter


    const handleAddToCart = (product) => {
        addToCart({ ...product, selectedSize: product.sizes?.[0] || 'One Size' })
        setAdded(product._id)
        setTimeout(() => setAdded(null), 2000)
    } // Hela denna blocket är logiken för att lägga till en produkt i kundvagnen
    // vi använder states från längre upp i koden och ger det syfte. 

    //Mer förklaring om hur jag har förstått att bygga design i min reflektion.
    return (
        <div className="home-wrapper">

            {/* HERO SEKTION */}
            <div className="hero-section">
                <img src={heroImg} alt="hero" className="hero-img" />
                {/* I Had trouble to adjust the picture and the text, so I used positioning 
                to center the picture and make it dynamic and still keep the buttons visible in the same position */}
                <div className="hero-content">
                    <h1 className="hero-title">
                        WORK HARD.<br />
                        PLAY WELL. STUDY WELL.<br />
                        EAT AND SLEEP PLENTY
                    </h1>
                    <div className="hero-buttons">
                        <button onClick={() => navigate('/register')} className="hero-btn">
                            Register
                        </button>
                        <button onClick={() => navigate('/products')} className="hero-btn">
                            Shop Gear
                        </button>
                    </div>
                </div>
            </div>

            {/* SECTION BILD MED POPULAR GEAR */}
            <div className="section-image">
                <img src={sectionImg} alt="section" className="section-img" />

                <div className="popular-gear">
                    <p className="popular-slogan">Gear for fighters worthy of the Flying Nimbus. 
                        For those who still train like a warrior and dream like a kid.</p>
                    <h2 className="popular-title">Popular Gear</h2>
                    <div className="popular-grid">
                        {products.map(product => (
                            <div key={product._id} className="popular-card">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="popular-card-img"
                                    onClick={() => navigate(`/products/${product._id}`)}
                                />
                                <p className="popular-card-name">{product.name}</p>
                                <p className="popular-card-price">{product.price} kr</p>
                                <button
                                    className="popular-card-btn"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    {added === product._id ? 'Added ✓' : 'Add to cart'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomePage