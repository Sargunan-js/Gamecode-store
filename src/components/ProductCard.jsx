import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

export default function ProductCard({ product }) {
    return (
        <div className="group relative bg-card-bg border border-white/5 rounded-xl overflow-hidden hover:border-electric-blue/50 transition duration-300 transform hover:-translate-y-1">
            {/* Image Container */}
            <Link to={`/product/${product.id}`} className="block relative aspect-[16/9] overflow-hidden">
                {product.thumbnail_url ? (
                    <img
                        src={product.thumbnail_url}
                        alt={product.title}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-surface flex items-center justify-center text-gray-600 font-bold text-xl">
                        NO IMAGE
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition" />

                {/* Platform Badge */}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                    {product.platform}
                </div>
            </Link>

            {/* Content */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-electric-blue transition line-clamp-1">{product.title}</h3>
                    <span className="text-xs text-gray-400 bg-surface px-2 py-0.5 rounded border border-white/5">{product.region}</span>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 mb-4 h-10">{product.description}</p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Price</span>
                        <span className="text-xl font-black text-white group-hover:text-electric-blue transition">${product.price}</span>
                    </div>

                    <button className="bg-white/5 hover:bg-electric-blue hover:text-black text-white p-2 rounded-lg transition border border-white/10 group-hover:border-electric-blue/50">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
