import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthProvider'
import { User, Image, Save, ShoppingBag, Loader2 } from 'lucide-react'

export default function Profile() {
    const { user, profile } = useAuth()
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])

    // Form State
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        avatar_url: '',
        banner_url: ''
    })
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (profile) {
            setFormData({
                username: profile.username || '',
                avatar_url: profile.avatar_url || '',
                banner_url: profile.banner_url || ''
            })
            fetchOrders()
        }
    }, [profile])

    const fetchOrders = async () => {
        const { data } = await supabase
            .from('orders')
            .select('*, products(*)')
            .eq('buyer_id', user.id)
            .order('created_at', { ascending: false })

        if (data) setOrders(data)
        setLoading(false)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setSaving(true)

        const { error } = await supabase
            .from('profiles')
            .update(formData)
            .eq('id', user.id)

        if (!error) {
            setEditing(false)
            window.location.reload() // Force reload to update context/UI
        } else {
            alert('Error updating profile')
        }
        setSaving(false)
    }

    if (loading) return <div className="p-20 text-center text-white">Loading Profile...</div>

    return (
        <div className="bg-background min-h-screen pb-20">

            {/* HEADER / BANNER */}
            <div className="h-48 md:h-64 bg-surface relative group">
                {formData.banner_url ? (
                    <img src={formData.banner_url} className="w-full h-full object-cover opacity-60" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-800" />
                )}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
                <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
                    {/* Avatar */}
                    <div className="w-32 h-32 rounded-2xl border-4 border-background bg-surface overflow-hidden shadow-2xl">
                        {formData.avatar_url ? (
                            <img src={formData.avatar_url} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-electric-blue text-black font-black text-4xl">
                                {formData.username?.[0]?.toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 mb-2">
                        <h1 className="text-3xl font-black text-white">{profile.username}</h1>
                        <p className="text-gray-400">{user.email}</p>
                    </div>

                    <button
                        onClick={() => setEditing(!editing)}
                        className="bg-surface border border-white/10 hover:bg-white/5 text-white px-4 py-2 rounded-lg font-bold transition"
                    >
                        {editing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {/* EDIT FORM */}
                {editing && (
                    <div className="bg-surface border border-white/10 p-6 rounded-xl animate-fade-in mb-8">
                        <h2 className="text-xl font-bold text-white mb-4">Edit Profile</h2>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Username</label>
                                <input
                                    value={formData.username}
                                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-electric-blue outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Avatar URL</label>
                                <input
                                    value={formData.avatar_url}
                                    onChange={e => setFormData({ ...formData, avatar_url: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-electric-blue outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Banner URL</label>
                                <input
                                    value={formData.banner_url}
                                    onChange={e => setFormData({ ...formData, banner_url: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-electric-blue outline-none"
                                />
                            </div>
                            <button disabled={saving} className="bg-electric-blue text-black font-bold py-3 px-6 rounded-lg hover:opacity-90 transition">
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                )}

                {/* ORDER HISTORY */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-electric-blue" /> Order History
                    </h2>

                    {orders.length > 0 ? (
                        <div className="grid gap-4">
                            {orders.map(order => (
                                <div key={order.id} className="bg-surface border border-white/5 p-4 rounded-xl flex items-center justify-between hover:border-white/20 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-black/50 rounded-lg overflow-hidden">
                                            {order.products?.thumbnail_url && <img src={order.products.thumbnail_url} className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{order.products?.title}</h3>
                                            <p className="text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-electric-blue font-bold text-sm bg-electric-blue/10 px-2 py-1 rounded inline-block mb-1">
                                            {order.status}
                                        </div>
                                        {order.key_value && (
                                            <div className="text-xs text-gray-500 font-mono bg-black p-1 rounded">
                                                Key: {order.key_value}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 bg-surface/30 rounded-xl border border-white/5">
                            No orders yet. Start shopping!
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
