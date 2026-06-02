import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/Api'
import { useCart } from '../context/CartContext'

const LoginPage = () => {
    const navigate = useNavigate()
    const { login } = useCart()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!form.email || !form.password) {
            setError('Please fill in all fields')
            return
        }

        setLoading(true)

        try {
            const result = await loginUser({
                email: form.email,
                password: form.password
            })

            if (result.accessToken) {
                login(result.accessToken)
                navigate('/')
            } else {
                setError(result.message || 'Invalid credentials')
            }
        } catch (err) {
            setError('Could not login, please try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your email"
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Your password"
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <button type="button" onClick={() => navigate('/register')}>
                    Don't have an account? Register
                </button>
            </form>
        </div>
    )
}

export default LoginPage