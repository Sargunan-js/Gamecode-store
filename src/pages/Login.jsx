import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { Mail, Lock, Loader2, Play } from 'lucide-react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            navigate('/')
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-surface border border-gray-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>

                <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-background border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-white"
                                placeholder="player@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <a href="#" className="text-xs text-primary hover:text-blue-400">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-background border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-white"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Login <Play className="w-4 h-4 fill-current" /></>}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary hover:text-blue-400 font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}
