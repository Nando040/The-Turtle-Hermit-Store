import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h1>The Turtle Hermit Store</h1>
            <p>Work hard. Play well. Study well. Eat and sleep plenty.</p>
            <button onClick={() => navigate('/products')}>Shop Gear</button>
        </div>
    )
}

export default HomePage