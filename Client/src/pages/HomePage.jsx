import { useNavigate } from 'react-router-dom'
import heroImg from '../../public/images/hero/goku-hero.png'
import sectionImg from '../../public/images/hero/goku-section.png'

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <div style={{ margin: 0, padding: 0 }}>

            {/* HERO SEKTION */}
            <div style={{ position: 'relative', width: '100%' }}>
                <img
                    src={heroImg}
                    alt="hero"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                />
            {/* I Had trouble to adjust the picture and the text, so I used positioning 
             to center the picture  and make it dynamic  ans stil keep the buttons visible  in the same position*/}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '60px',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    <h1 style={{
                        fontFamily: '"Permanent Marker", cursive',
                        fontSize: '36px',
                        lineHeight: '1.4',
                        color: '#000',
                        maxWidth: '400px'
                    }}>
                        WORK HARD.<br />
                        PLAY WELL. STUDY WELL.<br />
                        EAT AND SLEEP PLENTY
                    </h1>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '30px' }}>
                        <button onClick={() => navigate('/register')} style={btnStyle}>
                            Register
                        </button>
                        <button onClick={() => navigate('/products')} style={btnStyle}>
                            Shop Gear
                        </button>
                    </div>
                </div>
            </div>

            {/* SECTION BILD */}
            <div style={{ position: 'relative', width: '100%' }}>
                <img
                    src={sectionImg}
                    alt="section"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                />
            </div>


        </div>
    )
}

const btnStyle = {
    fontFamily: '"Permanent Marker", cursive',
    fontSize: '16px',
    padding: '10px 24px',
    background: 'rgba(200,200,200,0.7)',
    border: '1px solid #000',
    cursor: 'pointer',
    width: '160px',
    textAlign: 'center'
}

export default HomePage