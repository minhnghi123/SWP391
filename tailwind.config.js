/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideLeftIn: {
          '0%': { 
            transform: 'translateX(100%)',
          },
          '100%': { 
            transform: 'translateX(0)',
          },
        },
        slideRightIn: {
          '0%': { 
            transform: 'translateX(-100%)',
          },
          '100%': { 
            transform: 'translateX(0)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        slideLeftIn: 'slideLeftIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        slideRightIn: 'slideRightIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        fadeIn: 'fadeIn 0.3s ease-out',
      }
    }
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
