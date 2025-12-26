import { Link } from 'react-router-dom'
import { ArrowRight, Zap, ShieldCheck, Globe, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ProductCard from '../components/ProductCard'

export default function Home() {
    const [featured, setFeatured] = useState([])

    useEffect(() => {
        // Fetch some products for "Trending"
        const fetchTrending = async () => {
            const { data } = await supabase.from('products').select('*').limit(3)
            if (data) setFeatured(data)
        }
        fetchTrending()
    }, [])

    return (
        <div className="bg-background min-h-screen">

            {/* HERO SECTION */}
            <section className="relative h-[600px] flex items-center overflow-hidden">
                {/* Background Image/Gradient */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 w-full z-10">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-bold mb-6 animate-fade-in-up">
                            <Zap className="w-4 h-4" /> INSTANT DELIVERY
                        </div>

                        <h1 className="text-6xl md:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up delay-100">
                            LEVEL UP YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-purple-600">DIGITAL LIBRARY</span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 font-light animate-fade-in-up delay-200">
                            The premium marketplace for game keys, software, and exclusive digital assets. Secure. Fast. Verified.
                        </p>

                        <div className="flex gap-4 animate-fade-in-up delay-300">
                            <Link to="/catalog" className="px-8 py-4 bg-electric-blue text-black font-black text-lg rounded transform hover:scale-105 transition shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center gap-2">
                                BROWSE STORE
                            </Link>
                            <Link to="/sellers" className="px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold text-lg rounded hover:bg-white/10 transition">
                                BECOME A SELLER
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS TICKER */}
            <div className="bg-surface border-y border-white/5 py-6">
                <div className="max-w-7xl mx-auto px-4 flex justify-around text-center">
                    <div className="flex flex-col">
                        <span className="text-3xl font-black text-white">50K+</span>
                        <span className="text-sm text-gray-500 uppercase tracking-widest">Active Users</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-black text-electric-blue">Instant</span>
                        <span className="text-sm text-gray-500 uppercase tracking-widest">Delivery Time</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-black text-white">100%</span>
                        <span className="text-sm text-gray-500 uppercase tracking-widest">Secure Escrow</span>
                    </div>
                </div>
            </div>

            {/* TRENDING GRID */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black text-white flex items-center gap-3">
                        <Star className="w-8 h-8 text-yellow-400 fill-current" /> TRENDING NOW
                    </h2>
                    <Link to="/catalog" className="text-electric-blue font-bold hover:underline">View All</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featured.length > 0 ? (
                        featured.map(product => <ProductCard key={product.id} product={product} />)
                    ) : (
                        <div className="text-gray-500 col-span-3 text-center py-10">Loading featured items...</div>
                    )}
                </div>
            </section>

        </div>
    )
}
