import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, LogOut, Shield, Search } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthProvider'

export default function Navbar() {
    const { user, profile, signOut } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut()
        navigate('/login')
    }

    return (
        <nav className="bg-surface/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-2xl font-black tracking-wider text-white hover:text-electric-blue transition duration-300">
                            STITCH<span className="text-electric-blue">.MARKET</span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-baseline space-x-6">
                            <Link to="/catalog" className="text-gray-300 hover:text-electric-blue transition font-medium">Browse</Link>
                            <Link to="/sellers" className="text-gray-300 hover:text-electric-blue transition font-medium">Sellers</Link>

                            {user && profile?.role === 'admin' && (
                                <Link to="/admin" className="flex items-center text-red-400 hover:text-red-300 transition font-medium">
                                    <Shield className="w-4 h-4 mr-1" /> Admin
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search games, software..."
                                className="w-full bg-black/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition"
                            />
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/cart" className="relative group">
                            <ShoppingCart className="w-6 h-6 text-gray-300 group-hover:text-electric-blue transition" />
                            <span className="absolute -top-2 -right-2 bg-electric-blue text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">0</span>
                        </Link>

                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-3 text-gray-300 hover:text-white transition">
                                    <div className="text-right hidden lg:block">
                                        <div className="text-sm font-bold text-white">{profile?.username}</div>
                                        <div className="text-xs text-electric-blue">Level 5</div>
                                    </div>
                                    <div className="w-10 h-10 bg-surface border border-white/10 rounded-full flex items-center justify-center overflow-hidden">
                                        {profile?.avatar_url ? (
                                            <img src={profile.avatar_url} alt="Ava" className="not-prose" />
                                        ) : (
                                            <User className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </button>
                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-56 bg-surface border border-white/10 rounded-xl shadow-2xl py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto transform origin-top-right">
                                    <div className="px-4 py-3 border-b border-white/5">
                                        <p className="text-sm text-white font-bold">Signed in as</p>
                                        <p className="text-sm text-gray-400 truncate">{user.email}</p>
                                    </div>
                                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-electric-blue transition">Dashboard</Link>
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-electric-blue transition">My Profile</Link>
                                    <div className="border-t border-white/5 my-1"></div>
                                    <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2 transition">
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-4 items-center">
                                <Link to="/login" className="text-sm font-bold text-gray-300 hover:text-white transition">Log In</Link>
                                <Link to="/register" className="px-5 py-2.5 text-sm font-bold bg-white text-black rounded-full hover:bg-electric-blue hover:scale-105 transition duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link to="/cart" className="relative text-gray-300">
                            <ShoppingCart className="w-6 h-6" />
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
                            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-surface border-b border-white/10 animate-fade-in">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white mb-4 focus:outline-none focus:border-electric-blue"
                        />
                        <Link to="/catalog" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-300 hover:bg-white/5 hover:text-electric-blue">Browse Catalog</Link>
                        <Link to="/sellers" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-300 hover:bg-white/5 hover:text-electric-blue">Sellers</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-300 hover:bg-white/5 hover:text-electric-blue">Dashboard</Link>
                                <button onClick={handleSignOut} className="w-full text-left block px-3 py-3 rounded-lg text-base font-medium text-red-400 hover:bg-white/5">Sign Out</button>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <Link to="/login" className="text-center py-3 rounded-lg border border-white/10 text-white font-bold">Login</Link>
                                <Link to="/register" className="text-center py-3 rounded-lg bg-electric-blue text-black font-bold">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
