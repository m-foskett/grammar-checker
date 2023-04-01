const { colors } = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          '2xl': '1360px'
        }
      },
      extend: {
        fontFamily: {
          sans: ['var(--font-inter)', ...fontFamily.sans]
        },
        colors: {
          primary: {
            // Emerald
            '50': '#ecfdf5',
            '100': '#d1fae5',
            '200': '#a7f3d0',
            '300': '#6ee7b7',
            '400': '#34d399',
            '500': '#10b981',
            '600': '#059669',
            '700': '#047857',
            '800': '#065f46',
            '900': '#064e3b',
            // Slate
            // '50': '#f8fafc',
            // '100': '#f1f5f9',
            // '200': '#e2e8f0',
            // '300': '#cbd5e1',
            // '400': '#94a3b8',
            // '500': '#64748b',
            // '600': '#475569',
            // '700': '#334155',
            // '800': '#1e293b',
            // '900': '#0f172a',
            // Sky
            // '50': '#f0f9ff',
            // '100': '#e0f2fe',
            // '200': '#bae6fd',
            // '300': '#7dd3fc',
            // '400': '#38bdf8',
            // '500': '#0ea5e9',
            // '600': '#0284c7',
            // '700': '#0369a1',
            // '800': '#075985',
            // '900': '#0c4a6e',
            // Teal
            // '50': '#f0fdfa',
            // '100': '#ccfbf1',
            // '200': '#99f6e4',
            // '300': '#5eead4',
            // '400': '#2dd4bf',
            // '500': '#14b8a6',
            // '600': '#0d9488',
            // '700': '#0f766e',
            // '800': '#115e59',
            // '900': '#134e4a',
          },
          ...colors,
          'light-gold': '#f5bc51',
          'dark-gold': '#533519',
        }
      },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}