/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a',   // Deep Black
                surface: '#18181b',      // Dark Gray
                primary: '#2563eb',      // Standard Blue
                secondary: '#9333ea',    // Purple

                // Stitch Design Specifics
                'electric-blue': '#00F0FF', // The vibrant cyan/blue from the design
                'deep-bg': '#050505',       // Darker background
                'card-bg': '#121212',       // Slightly lighter card bg
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
