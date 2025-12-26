import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, LogOut, Shield } from 'lucide-react'
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
        <nav className="bg-surface/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition">
                            DIGIMARKET
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="hover:text-neon-blue px-3 py-2 rounded-md transition">Home</Link>
                            <Link to="/catalog" className="hover:text-neon-blue px-3 py-2 rounded-md transition">Catalog</Link>

                            {user && profile?.role === 'admin' && (
                                <Link to="/admin" className="flex items-center text-accent hover:text-red-400 px-3 py-2 rounded-md transition">
                                    <Shield className="w-4 h-4 mr-1" /> Admin
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/cart" className="relative p-2 text-gray-400 hover:text-white transition">
                            <ShoppingCart className="w-6 h-6" />
                            {/* Badge could go here */}
                        </Link>

                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 text-gray-300 hover:text-white">
                                    <span className="text-sm font-medium">{profile?.username || 'User'}</span>
                                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-neon-blue" />
                                    </div>
                                </button>
                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 bg-surface border border-gray-700 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Dashboard</Link>
                                    <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2">
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link to="/login" className="px-4 py-2 text-sm font-medium text-white hover:text-neon-blue transition">Log In</Link>
                                <Link to="/register" className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-blue-600 transition shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-surface border-b border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link to="/catalog" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Catalog</Link>
                        <Link to="/cart" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Cart</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                                <button onClick={handleSignOut} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Sign Out</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                                <Link to="/register" className="text-primary hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
