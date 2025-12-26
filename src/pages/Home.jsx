import { Link } from 'react-router-dom'
import { ArrowRight, Zap, ShieldCheck, Globe } from 'lucide-react'

export default function Home() {
    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-32 text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative max-w-4xl mx-auto px-4 z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-surface border border-gray-700 text-sm text-neon-blue mb-6">
                        New: Crypto Payments Now Accepted 🚀
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                        Instant Digital <br />
                        <span className="text-primary">Goods Delivery</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        The safest marketplace for game keys, software licenses, and gift cards.
                        Receive your products instantly after payment.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/catalog" className="px-8 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center gap-2">
                            Browse Catalog <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/register" className="px-8 py-3 bg-surface hover:bg-gray-800 border border-gray-700 text-white font-bold rounded-lg transition">
                            Start Selling
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-surface/50 p-6 rounded-xl border border-gray-800 hover:border-primary/50 transition duration-300">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-4">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Instant Delivery</h3>
                        <p className="text-gray-400">
                            No waiting. Automated systems send your keys immediately after purchase confirmation.
                        </p>
                    </div>
                    <div className="bg-surface/50 p-6 rounded-xl border border-gray-800 hover:border-primary/50 transition duration-300">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-500 mb-4">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Secure Escrow</h3>
                        <p className="text-gray-400">
                            Funds are held safely until you verify the product works. 100% money-back guarantee.
                        </p>
                    </div>
                    <div className="bg-surface/50 p-6 rounded-xl border border-gray-800 hover:border-primary/50 transition duration-300">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500 mb-4">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Global & Local</h3>
                        <p className="text-gray-400">
                            Find regional pricing and pay with your preferred local payment methods.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
