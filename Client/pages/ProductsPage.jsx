import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductsPage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products')
                const data = await response.json()
                setProducts(data)
            } catch (err) {
                setError('Kunde inte hämta produkter')
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    if (loading) return <p>Laddar produkter...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>Products</h1>
            <div>
                {products.map(product => (
                    <div key={product._id}>
                        <img src={product.imageUrl} alt={product.name} width="150" />
                        <h3>{product.name}</h3>
                        <p>{product.price} kr</p>
                        <p>{product.category}</p>
                        <button onClick={() => navigate(`/products/${product._id}`)}>
                            Visa detaljer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductsPage