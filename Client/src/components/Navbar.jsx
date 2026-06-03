import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/TurtleHermitLogo.png'

const Navbar = () => {
    const { cartCount } = useCart()
    const { authed, logout } = useAuth()

    return (
        <nav style={{
            background: 'linear-gradient(to right, #555, #999)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0px',
            height: '60px',
        }}>
            {/* VÄNSTER – Logo + Titel */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={logo} alt="logo" style={{ height: '60px' }} />
                <span style={{
                    fontFamily: '"Permanent Marker", cursive',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: '#000'
                }}>
                    The Turtle Hermit store
                </span>
            </div>

            {/* HÖGER – Länkar */}
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center', paddingRight: '20px' }}>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/products" style={linkStyle}>Products</Link>
                <Link to="/cart" style={linkStyle}>
                    Cart {cartCount > 0 && (
                        <span style={{
                            background: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '2px 8px',
                            fontSize: '12px',
                            marginLeft: '4px'
                        }}>
                            {cartCount}
                        </span>
                    )}
                </Link>
                {authed ? (
                    <button onClick={logout} style={linkStyle}>Logout</button>
                ) : (
                    <Link to="/login" style={linkStyle}>Login</Link>
                )}
            </div>
        </nav>
    )
}

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

