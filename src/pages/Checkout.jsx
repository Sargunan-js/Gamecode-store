import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthProvider'
import { useCart } from '../contexts/CartContext'
import { useSettings } from '../contexts/SettingsContext'
import { ShieldCheck, CreditCard, Loader2 } from 'lucide-react'

export default function Checkout() {
    const { cart, total, clearCart } = useCart()
    const { user } = useAuth()
    const { formatPrice } = useSettings()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login')
            return
        }

        setLoading(true)

        // Create order records for each item
        // In a real app, you'd process payment first
        const orders = cart.map(item => ({
            buyer_id: user.id,
            product_id: item.id,
            status: 'completed',
            key_value: 'KEY-' + Math.random().toString(36).substr(2, 9).toUpperCase()
        }))

        const { error } = await supabase.from('orders').insert(orders)

        if (error) {
            alert('Checkout failed: ' + error.message)
        } else {
            clearCart()
            navigate('/profile')
        }
        setLoading(false)
    }

    if (cart.length === 0) {
        navigate('/cart')
        return null
    }

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-3xl font-black text-white mb-8">Checkout</h1>

                <div className="bg-surface border border-white/5 p-6 rounded-xl mb-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-green-500" /> Order Summary
                    </h2>
                    <div className="space-y-4 mb-6">
                        {cart.map((item, i) => (
                            <div key={i} className="flex justify-between text-gray-300">
                                <span>{item.title}</span>
                                <span>{formatPrice(item.price)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xl font-bold text-white">
                        <span>Total</span>
                        <span className="text-electric-blue">{formatPrice(total)}</span>
                    </div>
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-electric-blue text-black font-bold py-4 rounded-xl hover:scale-105 transition shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                    {loading ? 'Processing...' : 'Pay & Get Keys'}
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">
                    By clicking pay, you agree to our Terms of Service.
                </p>
            </div>
        </div>
    )
}
