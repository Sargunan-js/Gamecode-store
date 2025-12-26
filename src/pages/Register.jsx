import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { Mail, Lock, User, Loader2, Sparkles } from 'lucide-react'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // 1. Sign Up
        const { data: { user }, error: authError } = await supabase.auth.signUp({
            email,
            password,
        })

        if (authError) {
            setError(authError.message)
            setLoading(false)
            return
        }

        if (user) {
            // 2. Create Profile
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: user.id,
                        email,
                        username,
                        role: 'buyer'
                    }
                ])

            if (profileError) {
                console.error('Profile creation failed:', profileError)
                setError('Account created but profile failed. Please contact support.')
            } else {
                navigate('/')
            }
        }
        setLoading(false)
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-surface border border-gray-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>

                <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
                <p className="text-center text-gray-400 mb-8">Join the marketplace today</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-background border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition text-white"
                                placeholder="GamerTag123"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-background border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition text-white"
                                placeholder="player@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-background border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition text-white"
                                placeholder="Suggest strong password"
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full type-submit bg-gradient-to-r from-secondary to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign Up <Sparkles className="w-4 h-4" /></>}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-secondary hover:text-purple-400 font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}
