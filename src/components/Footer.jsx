import { Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-gray-800 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-purple-500 bg-clip-text text-transparent mb-4">
                    DIGIMARKET
                </h2>
                <p className="text-gray-400 mb-6">Your #1 Source for Instant Digital Goods</p>
                <div className="flex justify-center gap-6 text-gray-400 mb-8">
                    <a href="#" className="hover:text-neon-blue transition"><Twitter className="w-5 h-5" /></a>
                    <a href="#" className="hover:text-neon-blue transition"><Github className="w-5 h-5" /></a>
                    <a href="#" className="hover:text-neon-blue transition"><Mail className="w-5 h-5" /></a>
                </div>
                <p className="text-sm text-gray-600">
                    © {new Date().getFullYear()} Digital Marketplace. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
