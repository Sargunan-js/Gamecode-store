import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ProtectedRoute } from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Catalog from './pages/Catalog'
import Dashboard from './pages/Dashboard'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import SellerProfile from './pages/SellerProfile'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="flex flex-col min-h-screen bg-background text-gray-100 font-sans">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/seller/:id" element={<SellerProfile />} />

                            {/* Protected Routes: Buyer/Seller */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                            </Route>

                            {/* Protected Routes: Admin */}
                            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                                <Route path="/admin" element={<AdminDashboard />} />
                            </Route>
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
