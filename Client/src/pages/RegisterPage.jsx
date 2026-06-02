import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/Api'

const RegisterPage = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
            setError('Please fill in all fields')
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
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                    />
                </div>

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

                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                    />
                </div>

                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Your address"
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>

                <button type="button" onClick={() => navigate('/login')}>
                    Already have an account? Login
                </button>
            </form>
        </div>
    )
}

export default RegisterPage