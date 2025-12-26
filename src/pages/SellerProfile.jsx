import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import ProductCard from '../components/ProductCard'
import { MapPin, ShieldCheck, Mail } from 'lucide-react'

export default function SellerProfile() {
    const { id } = useParams() // Expecting /seller/:id
    const [seller, setSeller] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // For demo, if no ID, we might need to handle differently or pick a random one
        // But assuming routing passes ID.
        if (!id) return

        const fetchData = async () => {
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', id).single()
            if (profile) {
                setSeller(profile)
                const { data: pros } = await supabase.from('products').select('*').eq('seller_id', id)
                setProducts(pros || [])
            }
            setLoading(false)
        }
        fetchData()
    }, [id])

    if (loading) return <div className="p-20 text-center">Loading Seller...</div>
    if (!seller) return <div className="p-20 text-center">Seller not found</div>

    return (
        <div className="bg-background min-h-screen">
            {/* Banner */}
            <div className="h-64 bg-gray-800 relative overflow-hidden">
                {seller.banner_url ? (
                    <img src={seller.banner_url} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center">
                        <span className="text-gray-700 text-4xl font-black tracking-widest uppercase opacity-20">Storefront</span>
                    </div>
                )}
            </div>

            {/* Profile Info */}
            <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 mb-12">
                <div className="bg-surface/90 backdrop-blur border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-end gap-6 shadow-2xl">
                    <div className="w-32 h-32 bg-black rounded-xl border-4 border-surface overflow-hidden shadow-lg">
                        {seller.avatar_url ? (
                            <img src={seller.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-electric-blue flex items-center justify-center text-black font-bold text-3xl">
                                {seller.username[0].toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-black text-white mb-1">{seller.username}</h1>
                        <div className="flex flex-col md:flex-row gap-4 text-gray-400 text-sm">
                            <span className="flex items-center gap-1 justify-center md:justify-start">
                                <ShieldCheck className="w-4 h-4 text-green-500" /> Verified Seller
                            </span>
                            <span className="flex items-center gap-1 justify-center md:justify-start">
                                <MapPin className="w-4 h-4" /> Global
                            </span>
                            <span className="flex items-center gap-1 justify-center md:justify-start">
                                <Mail className="w-4 h-4" /> Contact
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-center px-4 border-r border-white/5">
                            <div className="text-2xl font-bold text-electric-blue">98%</div>
                            <div className="text-xs text-gray-500 uppercase">Rating</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="text-2xl font-bold text-white">{products.length}</div>
                            <div className="text-xs text-gray-500 uppercase">Products</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seller Products */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-electric-blue pl-4">Recently Added</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </div>
        </div>
    )
}
