/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#064E3B', // Deep Emerald Green
          dark: '#04382A',
          light: '#0D6850',
          deep: '#03231A',
        },
        forest: {
          DEFAULT: '#0B3D32', // Secondary Forest Green
          dark: '#072821',
          light: '#135445',
        },
        ivory: {
          DEFAULT: '#FAF7EF', // Background Warm Ivory
          50: '#FDFBF7',
          100: '#FAF7EF',
          200: '#F3EEDB',
          300: '#E9E0C2',
        },
        gold: {
          DEFAULT: '#C69B48', // Accent Muted Gold
          50: '#FCFAF5',
          100: '#F8F2E4',
          200: '#F0E2C1',
          300: '#E5CD92',
          400: '#D6B768',
          500: '#C69B48',
          600: '#A97E30',
          700: '#866022',
          800: '#644619',
          900: '#473012',
        },
        charcoal: {
          DEFAULT: '#242824', // Text Dark Charcoal
          muted: '#525752',
          light: '#727872',
          border: '#E2DECFC',
        },
        emerald: {
          50: '#F0F8F5',
          100: '#DCF0E7',
          200: '#BCE2D2',
          300: '#8ECBB3',
          400: '#56AD8D',
          500: '#2E8F6E',
          600: '#1D7255',
          700: '#0B3D32',
          800: '#08382D',
          900: '#064E3B',
          950: '#03231A',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', 'Georgia', 'Cambria', 'serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['"Amiri"', 'serif'],
      },
      backgroundImage: {
        'islamic-pattern': "radial-gradient(#C69B48 0.65px, transparent 0.65px), radial-gradient(#C69B48 0.65px, #FAF7EF 0.65px)",
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'float-reverse': 'floatReverse 4.5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
}
