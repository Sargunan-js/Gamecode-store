import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useSettings } from '../contexts/SettingsContext'

export default function Cart() {
    const { cart, removeFromCart, clearCart, total } = useCart()
    const { formatPrice, t } = useSettings()
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-background pb-20 pt-10">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                    <ShoppingCart className="w-8 h-8 text-electric-blue" />
                    {t('cart')}
                </h1>

                {cart.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="md:col-span-2 space-y-4">
                            {cart.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="bg-surface border border-white/5 p-4 rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-12 bg-black/50 rounded overflow-hidden">
                                            {item.thumbnail_url && <img src={item.thumbnail_url} className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{item.title}</h3>
                                            <div className="text-sm text-gray-400">{item.platform}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="font-bold text-white">{formatPrice(item.price)}</span>
                                        <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-400 transition">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button onClick={clearCart} className="text-sm text-gray-500 hover:text-white underline">
                                Clear Cart
                            </button>
                        </div>

                        {/* Summary */}
                        <div className="md:col-span-1">
                            <div className="bg-surface border border-white/5 p-6 rounded-xl sticky top-24">
                                <h2 className="text-xl font-bold text-white mb-4">Summary</h2>
                                <div className="flex justify-between mb-2 text-gray-400">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between mb-6 text-gray-400">
                                    <span>Taxes</span>
                                    <span>{formatPrice(0)}</span>
                                </div>
                                <div className="border-t border-white/10 pt-4 mb-6 flex justify-between items-center">
                                    <span className="text-lg font-bold text-white">Total</span>
                                    <span className="text-2xl font-black text-electric-blue">{formatPrice(total)}</span>
                                </div>
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full bg-electric-blue text-black font-bold py-4 rounded-lg hover:scale-105 transition shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2"
                                >
                                    {t('buy')} <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-surface/30 rounded-2xl border border-white/5">
                        <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
                        <p className="text-gray-400 mb-6">Looks like you haven't added any games yet.</p>
                        <button onClick={() => navigate('/catalog')} className="text-electric-blue font-bold hover:underline">
                            {t('browse')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
