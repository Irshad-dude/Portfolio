/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': 'var(--bg-dark)',
        'bg-card': 'var(--bg-card)',
        'bg-card-hover': 'var(--bg-card-hover)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'accent-cyan': 'var(--accent-cyan)',
        'accent-indigo': 'var(--accent-indigo)',
        'border-color': 'var(--border-color)',
      }
    },
  },
  plugins: [],
}
