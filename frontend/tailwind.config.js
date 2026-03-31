/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'infinite-scroll': 'infinite-scroll 20s linear infinite',
            },
            keyframes: {
                'infinite-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' },
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                "white-b-color": "#ffffff",
                background: "#fdfdfd",
                surface: "#ffffff",
                "surface-light": "#f5f5f5",
                primary: "#000000",
                secondary: "#555555",
                accent: "#222222",
                text: {
                    main: "#000000",
                    muted: "#6b7280"
                }
            }
        },
    },
    plugins: [],
}

