import ProductManager from './ProductManager'
import { Shield } from 'lucide-react'

export default function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
                <Shield className="w-8 h-8 text-red-500" />
                <h1 className="text-3xl font-bold">Admin Control Center</h1>
            </div>

            <div className="grid md:grid-cols-1 gap-8">
                {/* Product Management Section */}
                <section>
                    <ProductManager />
                </section>

                {/* User Management could go here */}
            </div>
        </div>
    )
}
