import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider'
import { Loader2 } from 'lucide-react'

export const ProtectedRoute = ({ allowedRoles }) => {
    const { user, profile, loading } = useAuth()

    if (loading) {
        return <div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles && (!profile || !allowedRoles.includes(profile.role))) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}
