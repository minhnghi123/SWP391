/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: ['rounded'],
      keyframes: {
        slideLeftIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRightIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { 
            transform: 'translateY(-100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
      },
      animation: {
        slideLeftIn: 'slideLeftIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        slideRightIn: 'slideRightIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideDown: 'slideDown 0.8s ease-out forwards',
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
    },
    animation: {
      fadeInDelay: "fadeIn 0.5s ease-in-out 1s forwards", // 1s delay
    },
  },
  plugins: [require("tailwind-scrollbar-hide"),],
};
