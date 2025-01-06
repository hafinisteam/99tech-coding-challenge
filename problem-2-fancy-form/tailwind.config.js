/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
      },
      colors: {
        'content-primary': '#050f19',
        'content-secondary': '#657795',
        dimed: '#edeff1',
        primary: '#1452f0',
        'primary-dark': '#0e38a1',
        'dark-pink': '#ac0a0a',
      },
    },
  },
  plugins: [],
}
