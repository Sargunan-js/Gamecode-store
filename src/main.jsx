import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SettingsProvider } from './contexts/SettingsContext'
import { CartProvider } from './contexts/CartContext'

console.log('Main mounting')
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SettingsProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </SettingsProvider>
    </React.StrictMode>,
)
