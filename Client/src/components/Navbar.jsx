import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/TurtleHermitLogo.png'
import './Navbar.css'

const Navbar = () => {
    const { cartCount } = useCart()
    const { authed, logout } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)

    const closeMenu = () => setMenuOpen(false)

    return (
        <nav className="navbar">

            {/* Logo + titel */}
            <div className="navbar-brand">
                <img src={logo} alt="logo" className="navbar-logo" />
                <span className="navbar-title">The Turtle Hermit store</span>
            </div>

            {/* Desktop länkar */}
            <div className="navbar-links">
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/products" style={linkStyle}>Products</Link>
                <Link to="/cart" style={linkStyle}>
                    Cart {cartCount > 0 && (
                        <span className="cart-badge">{cartCount}</span>
                    )}
                </Link>
                {authed ? (
                    <button onClick={logout} style={linkStyle}>Logout</button>
                ) : (
                    <Link to="/login" style={linkStyle}>Login</Link>
                )}
            </div>

            {/* Hamburger ikon – visas bara på mobil */}
            <button
                className="hamburger"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Toggle menu"
            >
                {menuOpen ? '✕' : '☰'}
            </button>

            {/* Mobil dropdown */}
            {menuOpen && (
                <div className="mobile-menu">
                    <Link to="/" className="mobile-link" onClick={closeMenu}>Home</Link>
                    <Link to="/products" className="mobile-link" onClick={closeMenu}>Products</Link>
                    <Link to="/cart" className="mobile-link" onClick={closeMenu}>
                        Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    {authed ? (
                        <button className="mobile-link" onClick={() => { logout(); closeMenu() }}>
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="mobile-link" onClick={closeMenu}>Login</Link>
                    )}
                </div>
            )}

        </nav>
    )
}

// Mer om detta i reflektionen
const linkStyle = {
    color: '#000',
    textDecoration: 'none',
    fontFamily: '"Permanent Marker", cursive',
    fontSize: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
}

export default Navbar