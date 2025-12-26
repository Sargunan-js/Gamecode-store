import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthProvider'
import { ShoppingCart, ShieldCheck, Globe, MessageCircle, Send } from 'lucide-react'

export default function ProductDetail() {
    const { id } = useParams()
    const { user } = useAuth()
    const [product, setProduct] = useState(null)
    const [questions, setQuestions] = useState([])
    const [newQuestion, setNewQuestion] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProduct()
        fetchQuestions()
    }, [id])

    const fetchProduct = async () => {
        const { data } = await supabase.from('products').select('*, profiles(*)').eq('id', id).single()
        if (data) setProduct(data)
    }

    const fetchQuestions = async () => {
        const { data } = await supabase.from('qna').select('*, profiles(*)').eq('product_id', id).order('created_at', { ascending: false })
        if (data) setQuestions(data)
        setLoading(false)
    }

    const handleAskQuestion = async (e) => {
        e.preventDefault()
        if (!newQuestion.trim()) return

        const { error } = await supabase.from('qna').insert([
            { product_id: id, user_id: user.id, question: newQuestion }
        ])

        if (!error) {
            setNewQuestion('')
            fetchQuestions()
        }
    }

    if (loading) return <div className="p-20 text-center">Loading...</div>
    if (!product) return <div className="p-20 text-center">Product not found</div>

    return (
        <div className="bg-background min-h-screen pb-20">

            {/* HEADER IMAGE */}
            <div className="relative h-[500px]">
                {product.thumbnail_url ? (
                    <img src={product.thumbnail_url} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-surface" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-electric-blue text-black font-bold px-3 py-1 rounded text-sm uppercase tracking-wider">{product.platform}</span>
                                <span className="bg-white/10 text-white font-bold px-3 py-1 rounded text-sm uppercase tracking-wider">{product.region}</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 shadow-xl">{product.title}</h1>
                            <div className="flex items-center gap-2 text-gray-300">
                                <span>Sold by</span>
                                <Link to={`/seller/${product.seller_id}`} className="text-electric-blue font-bold hover:underline">
                                    {product.profiles?.username || 'Seller'}
                                </Link>
                            </div>
                        </div>

                        <div className="bg-surface/80 backdrop-blur p-6 rounded-2xl border border-white/5 min-w-[300px]">
                            <div className="text-gray-400 text-sm mb-1">Current Price</div>
                            <div className="text-4xl font-black text-white mb-6">${product.price}</div>
                            <button className="w-full py-4 bg-electric-blue text-black font-bold text-lg rounded-xl hover:scale-105 transition shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2">
                                <ShoppingCart className="w-5 h-5" /> Buy Now
                            </button>
                            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-green-400">
                                <ShieldCheck className="w-4 h-4" /> Instant Delivery
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 mt-12">
                {/* DESCRIPTION */}
                <div className="md:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-electric-blue pl-4">Description</h2>
                        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                            {product.description}
                        </div>
                    </section>

                    {/* Q&A SECTION */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-4 flex items-center gap-3">
                            <MessageCircle className="w-6 h-6" /> Q&A
                        </h2>

                        {/* Ask Box */}
                        {user ? (
                            <form onSubmit={handleAskQuestion} className="mb-8 flex gap-4">
                                <input
                                    value={newQuestion}
                                    onChange={(e) => setNewQuestion(e.target.value)}
                                    placeholder="Ask the seller a question..."
                                    className="flex-1 bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-blue outline-none"
                                />
                                <button type="submit" className="bg-surface border border-white/10 hover:bg-white/5 text-electric-blue p-3 rounded-lg transition">
                                    <Send className="w-6 h-6" />
                                </button>
                            </form>
                        ) : (
                            <div className="bg-surface/50 p-4 rounded-lg mb-8 text-center text-gray-400">
                                <Link to="/login" className="text-electric-blue hover:underline">Log in</Link> to ask questions.
                            </div>
                        )}

                        <div className="space-y-6">
                            {questions.map(q => (
                                <div key={q.id} className="bg-surface border border-white/5 p-4 rounded-xl">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="font-bold text-white">{q.profiles?.username}</div>
                                        <div className="text-gray-400 text-sm flex-1">{q.question}</div>
                                        <div className="text-xs text-gray-600">{new Date(q.created_at).toLocaleDateString()}</div>
                                    </div>

                                    {q.answer ? (
                                        <div className="bg-black/30 p-3 rounded-lg ml-8 border-l-2 border-green-500">
                                            <div className="text-xs text-green-500 font-bold mb-1">Seller Response</div>
                                            <div className="text-gray-300 text-sm">{q.answer}</div>
                                        </div>
                                    ) : (
                                        <div className="ml-8 text-xs text-gray-600 italic">Waiting for answer...</div>
                                    )}
                                </div>
                            ))}
                            {questions.length === 0 && <div className="text-gray-500 text-center">No questions yet.</div>}
                        </div>
                    </section>
                </div>

                {/* SIDEBAR */}
                <div className="md:col-span-1">
                    {/* Similar items could go here */}
                </div>
            </div>

        </div>
    )
}
