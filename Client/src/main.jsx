import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'

// Denna kod blocket är den som renderar hela React appen,
// dvs att den är frontends server.js som startar upp hela appen och gör att den kan köras i webbläsaren.
//Detta gör genom att använda HTML elementet med id 'root'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
