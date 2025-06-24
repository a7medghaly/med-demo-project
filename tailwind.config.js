/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f9f9',
          100: '#ccf2f3',
          200: '#99e6e7',
          300: '#66d9db',
          400: '#33cccf',
          500: '#00B4B6',
          600: '#009092',
          700: '#006c6e',
          800: '#00484a',
          900: '#002426'
        },
        accent: {
          50: '#e6eef6',
          100: '#ccdded',
          200: '#99bbdb',
          300: '#6699c9',
          400: '#3377b7',
          500: '#0F2D52',
          600: '#0c2442',
          700: '#091b32',
          800: '#061222',
          900: '#030911'
        }
      },
      fontFamily: {
        'arabic': ['Noto Sans Arabic', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
};