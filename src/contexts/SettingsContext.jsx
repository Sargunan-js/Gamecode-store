import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext({})

export const useSettings = () => useContext(SettingsContext)

export const SettingsProvider = ({ children }) => {
    const [currency, setCurrency] = useState('USD')
    const [language, setLanguage] = useState('en')

    // Simple exchange rates relative to USD
    const rates = {
        USD: 1,
        RUB: 92.50, // Example rate
        AED: 3.67
    }

    const translations = {
        en: {
            browse: 'Browse',
            sellers: 'Sellers',
            login: 'Log In',
            signup: 'Sign Up',
            cart: 'Cart',
            search: 'Search games, software...',
            price: 'Price',
            buy: 'Buy Now',
            addToCart: 'Add to Cart',
            soldBy: 'Sold by',
            dashboard: 'Dashboard',
            profile: 'My Profile',
            logout: 'Sign Out'
        },
        es: {
            browse: 'Explorar',
            sellers: 'Vendedores',
            login: 'Entrar',
            signup: 'Registrarse',
            cart: 'Carrito',
            search: 'Buscar juegos...',
            price: 'Precio',
            buy: 'Comprar',
            addToCart: 'Añadir',
            soldBy: 'Vendido por',
            dashboard: 'Panel',
            profile: 'Mi Perfil',
            logout: 'Salir'
        },
        fr: {
            browse: 'Parcourir',
            sellers: 'Vendeurs',
            login: 'Connexion',
            signup: 'S\'inscrire',
            cart: 'Panier',
            search: 'Rechercher...',
            price: 'Prix',
            buy: 'Acheter',
            addToCart: 'Ajouter',
            soldBy: 'Vendu par',
            dashboard: 'Tableau de bord',
            profile: 'Mon Profil',
            logout: 'Déconnexion'
        }
    }

    const formatPrice = (amountInUSD) => {
        const rate = rates[currency] || 1
        const converted = amountInUSD * rate

        return new Intl.NumberFormat(language === 'en' ? 'en-US' : language, {
            style: 'currency',
            currency: currency
        }).format(converted)
    }

    const t = (key) => {
        return translations[language][key] || key
    }

    const value = {
        currency,
        setCurrency,
        language,
        setLanguage,
        formatPrice,
        t,
        currencies: Object.keys(rates),
        languages: ['en', 'es', 'fr']
    }

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}
