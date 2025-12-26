import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ProductCard from '../components/ProductCard'
import { Filter, Search, X } from 'lucide-react'

export default function Catalog() {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [filters, setFilters] = useState({
        platform: [],
        region: []
    })
    const [showMobileValues, setShowMobileFilters] = useState(false)

    const platforms = ['Steam', 'Xbox', 'PSN', 'Ubisoft', 'Origin']
    const regions = ['Global', 'US', 'EU', 'CIS', 'Asia']

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        applyFilters()
    }, [products, search, filters])

    const fetchProducts = async () => {
        const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
        if (data) {
            setProducts(data)
            setFilteredProducts(data)
        }
        setLoading(false)
    }

    const applyFilters = () => {
        let result = products

        // Search
        if (search) {
            result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
        }

        // Platform
        if (filters.platform.length > 0) {
            result = result.filter(p => filters.platform.includes(p.platform))
        }

        // Region
        if (filters.region.length > 0) {
            result = result.filter(p => filters.region.includes(p.region))
        }

        setFilteredProducts(result)
    }

    const toggleFilter = (type, value) => {
        setFilters(prev => {
            const current = prev[type]
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value]
            return { ...prev, [type]: updated }
        })
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="bg-surface border-b border-white/5 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-black text-white mb-4">Catalog</h1>
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-electric-blue transition"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
                {/* Mobile Filter Toggle */}
                <button
                    className="md:hidden flex items-center gap-2 text-white bg-surface p-3 rounded"
                    onClick={() => setShowMobileFilters(!showMobileValues)}
                >
                    <Filter className="w-5 h-5" /> Filters
                </button>

                {/* Sidebar Filters */}
                <aside className={`md:w-64 space-y-8 ${showMobileValues ? 'block' : 'hidden md:block'}`}>

                    {/* Platforms */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Platform</h3>
                        <div className="space-y-2">
                            {platforms.map(p => (
                                <label key={p} className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${filters.platform.includes(p) ? 'bg-electric-blue border-electric-blue' : 'border-gray-600 group-hover:border-white'}`}>
                                        {filters.platform.includes(p) && <div className="w-2 h-2 bg-black rounded-sm" />}
                                    </div>
                                    <span className={`text-sm ${filters.platform.includes(p) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{p}</span>
                                    <input type="checkbox" className="hidden" checked={filters.platform.includes(p)} onChange={() => toggleFilter('platform', p)} />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Regions */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Region</h3>
                        <div className="space-y-2">
                            {regions.map(r => (
                                <label key={r} className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${filters.region.includes(r) ? 'bg-electric-blue border-electric-blue' : 'border-gray-600 group-hover:border-white'}`}>
                                        {filters.region.includes(r) && <div className="w-2 h-2 bg-black rounded-sm" />}
                                    </div>
                                    <span className={`text-sm ${filters.region.includes(r) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{r}</span>
                                    <input type="checkbox" className="hidden" checked={filters.region.includes(r)} onChange={() => toggleFilter('region', r)} />
                                </label>
                            ))}
                        </div>
                    </div>

                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    {loading ? (
                        <div className="text-center py-20 text-gray-500">Loading catalog...</div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-2xl font-bold text-gray-700 mb-2">No products found</div>
                            <p className="text-gray-500">Try adjusting your filters</p>
                            <button onClick={() => setFilters({ platform: [], region: [] })} className="mt-4 text-electric-blue hover:underline">
                                Reset Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
