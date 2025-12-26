/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a',
                surface: '#121212',
                primary: '#3b82f6', // Neon Blue-ish
                secondary: '#8b5cf6', // Purple
                accent: '#f43f5e', // Red/Pink accent
                'neon-blue': '#00f3ff',
                'neon-purple': '#bc13fe',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
