/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#060608',
          900: '#0a0a0f',
          850: '#101017',
          800: '#161620',
          700: '#222230',
        },
        haki: {
          blood: '#7f1d1d',
          dark: '#991b1b',
          crimson: '#dc2626',
          scarlet: '#ef4444',
          neon: '#ff1a40',
          glow: 'rgba(239, 68, 68, 0.45)',
        }
      },
      boxShadow: {
        'haki-sm': '0 0 10px rgba(220, 38, 38, 0.25)',
        'haki-md': '0 0 20px rgba(239, 68, 68, 0.35)',
        'haki-lg': '0 0 35px rgba(255, 26, 64, 0.45)',
        'haki-strike': 'inset 0 0 15px rgba(239, 68, 68, 0.3), 0 0 25px rgba(220, 38, 38, 0.4)',
      },
      keyframes: {
        'haki-pulse': {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 6px #ef4444)' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 14px #ff1a40)' },
        },
        'lightning-flicker': {
          '0%, 100%': { opacity: '1' },
          '20%': { opacity: '0.4' },
          '40%': { opacity: '0.9' },
          '60%': { opacity: '0.2' },
          '80%': { opacity: '1' },
        }
      },
      animation: {
        'haki-pulse': 'haki-pulse 2.5s infinite ease-in-out',
        'lightning': 'lightning-flicker 3s infinite steps(1)',
      }
    },
  },
  plugins: [],
}
