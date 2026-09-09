/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#344238',
          light: '#43564A',
          dark: '#26322B',
        },
        sage: {
          DEFAULT: '#A8B5A0',
          light: '#C0CCB8',
          dark: '#8B9A82',
        },
        beige: {
          DEFAULT: '#EFE5D5',
          light: '#F5EEDF',
          dark: '#E2D4BE',
        },
        cream: {
          DEFAULT: '#FFFDF7',
          dark: '#F6F0E3',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 40px -12px rgba(52, 66, 56, 0.18)',
        glow: '0 20px 45px -18px rgba(168, 181, 160, 0.65)',
        card: '0 10px 30px -12px rgba(52, 66, 56, 0.14)',
      },
      dropShadow: {
        soft: '0 18px 30px rgba(52, 66, 56, 0.18)',
        glow: '0 12px 28px rgba(168, 181, 160, 0.5)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at 70% 30%, rgba(168, 181, 160, 0.22), transparent 55%), radial-gradient(circle at 10% 90%, rgba(239, 229, 213, 0.9), transparent 50%)',
        'cta-radial':
          'radial-gradient(circle at 85% 15%, rgba(168, 181, 160, 0.18), transparent 50%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out both',
        'fade-in': 'fade-in 1.2s ease-out both',
        float: 'float 7s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
