import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Plus, Trash, Loader2 } from 'lucide-react'

export default function ProductManager() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState(false)
    const [formData, setFormData] = useState({
        title: '', description: '', price: '', platform: 'Steam', region: 'Global', stock_count: 1
    })

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
        if (data) setProducts(data)
        setLoading(false)
    }

    const handleAddProduct = async (e) => {
        e.preventDefault()
        setAdding(true)
        const { error } = await supabase.from('products').insert([
            { ...formData, price: parseFloat(formData.price), stock_count: parseInt(formData.stock_count) }
        ])
        if (!error) {
            setFormData({ title: '', description: '', price: '', platform: 'Steam', region: 'Global', stock_count: 1 })
            fetchProducts()
        } else {
            alert(error.message)
        }
        setAdding(false)
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return
        const { error } = await supabase.from('products').delete().eq('id', id)
        if (!error) fetchProducts()
    }

    return (
        <div className="bg-surface p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-neon-blue" /> Add New Product
            </h2>

            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <input
                    placeholder="Game Title"
                    className="bg-background border border-gray-700 rounded p-2 text-white"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <input
                    placeholder="Price"
                    type="number" step="0.01"
                    className="bg-background border border-gray-700 rounded p-2 text-white"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    required
                />
                <select
                    className="bg-background border border-gray-700 rounded p-2 text-white"
                    value={formData.platform}
                    onChange={e => setFormData({ ...formData, platform: e.target.value })}
                >
                    <option>Steam</option>
                    <option>Xbox</option>
                    <option>PSN</option>
                    <option>Ubisoft</option>
                </select>
                <select
                    className="bg-background border border-gray-700 rounded p-2 text-white"
                    value={formData.region}
                    onChange={e => setFormData({ ...formData, region: e.target.value })}
                >
                    <option>Global</option>
                    <option>US</option>
                    <option>EU</option>
                    <option>CIS</option>
                </select>
                <textarea
                    placeholder="Description"
                    className="bg-background border border-gray-700 rounded p-2 text-white md:col-span-2"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
                <button
                    type="submit"
                    disabled={adding}
                    className="bg-primary hover:bg-blue-600 text-white font-bold py-2 rounded md:col-span-2"
                >
                    {adding ? 'Adding...' : 'Create Product'}
                </button>
            </form>

            <h2 className="text-xl font-bold mb-4">Inventory ({products.length})</h2>
            {loading ? <Loader2 className="animate-spin" /> : (
                <div className="space-y-2">
                    {products.map(p => (
                        <div key={p.id} className="flex items-center justify-between bg-background p-3 rounded border border-gray-800">
                            <div>
                                <div className="font-bold">{p.title}</div>
                                <div className="text-sm text-gray-500">{p.platform} | {p.region} | ${p.price}</div>
                            </div>
                            <button
                                onClick={() => handleDelete(p.id)}
                                className="text-red-500 hover:text-red-400 p-2"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
