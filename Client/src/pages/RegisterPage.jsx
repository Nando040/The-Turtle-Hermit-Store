import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/Api'
import './RegisterPage.css'

const RegisterPage = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: ''
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!form.name || !form.email || !form.password || !form.address) {
            setError('Please fill in all required fields')
            return
        }

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setLoading(true)

        try {
            const result = await registerUser({
                name: form.name,
                email: form.email,
                password: form.password,
                address: form.address
            })

            if (result._id) {
                navigate('/login')
            } else {
                setError(result.message || 'Something went wrong')
            }
        } catch (err) {
            setError('Could not register, please try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="register-page">

            {/* Background layer */}
            <div className="register-background" />

            {/* Content above background */}
            <div className="register-content">
                <h1 className="register-title">Register</h1>

                <form className="register-form" onSubmit={handleSubmit}>

                    <div className="register-field">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                        />
                    </div>

                    <div className="register-field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Your email"
                        />
                    </div>

                    <div className="register-field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Your password"
                        />
                    </div>

                    <div className="register-field">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                        />
                    </div>

                    <div className="register-field">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Your phone number"
                        />
                    </div>

                    <div className="register-field">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Your address"
                        />
                    </div>

                    {error && <p className="register-error">{error}</p>}

                    <button type="submit" className="register-btn" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    <button
                        type="button"
                        className="register-login-link"
                        onClick={() => navigate('/login')}
                    >
                        Already have an account? Login
                    </button>

                </form>
            </div>
        </div>
    )
}

export default RegisterPage