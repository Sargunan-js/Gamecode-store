import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from './AuthProvider'

const CartContext = createContext({})

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
    const { user } = useAuth()
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchCart()
        } else {
            setCart([])
            setLoading(false)
        }
    }, [user])

    const fetchCart = async () => {
        if (!user) return

        const { data } = await supabase
            .from('cart_items')
            .select('*, products(*)')
            .eq('user_id', user.id)

        if (data) {
            // Map to product objects for compatibility
            setCart(data.map(item => item.products))
        }
        setLoading(false)
    }

    const addToCart = async (product) => {
        console.log('addToCart called for product:', product)

        if (!user) {
            console.log('No user logged in')
            alert('Please log in to add items to cart')
            return
        }

        // Check if already in cart
        if (cart.find(item => item.id === product.id)) {
            console.log('Product already in cart')
            alert('This item is already in your cart')
            return
        }

        console.log('Inserting into cart_items:', { user_id: user.id, product_id: product.id })
        const { data, error } = await supabase
            .from('cart_items')
            .insert([{ user_id: user.id, product_id: product.id }])

        if (error) {
            console.error('Error adding to cart:', error)
            alert('Failed to add to cart: ' + error.message)
        } else {
            console.log('Successfully added to cart, refreshing...')
            alert('Added to cart!')
            fetchCart()
        }
    }

    const removeFromCart = async (productId) => {
        if (!user) return

        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', user.id)
            .eq('product_id', productId)

        if (!error) {
            fetchCart()
        }
    }

    const clearCart = async () => {
        if (!user) return

        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', user.id)

        if (!error) {
            setCart([])
        }
    }

    const total = cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total, loading }}>
            {children}
        </CartContext.Provider>
    )
}
