/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003d7a',
        secondary: '#FF6B35',
        accent: '#FF6B35',
        navy: {
          50: '#e6f0ff',
          100: '#b3d1ff',
          200: '#80b3ff',
          300: '#4d94ff',
          400: '#1a75ff',
          500: '#003d7a',
          600: '#003366',
          700: '#002952',
          800: '#001f3d',
          900: '#001429',
        },
        orange: {
          50: '#fff5f0',
          100: '#ffe0d1',
          200: '#ffccb3',
          300: '#ffb794',
          400: '#ffa376',
          500: '#FF6B35',
          600: '#e65a2a',
          700: '#cc4a1f',
          800: '#b33914',
          900: '#992909',
        },
        slate: {
          dark: '#003d7a',
          DEFAULT: '#003d7a',
          light: '#005fa3',
          lighter: '#1a75ff',
        },
        gray: {
          dark: '#1a1a1a',
          DEFAULT: '#333333',
          light: '#666666',
          lighter: '#f5f5f5',
        },
        accent: {
          blue: '#a1c8ef',
          orange: '#FF6B35',
          dark: '#002952',
          light: '#fff5f0',
        },
        gradient: {
          start: '#003d7a',
          mid: '#005fa3',
          end: '#FF6B35',
        },
        tmc: {
          navy: '#003d7a',
          orange: '#FF6B35',
          light: '#f9f9f9',
          cream: '#fff5f0',
        },
        text: {
          DEFAULT: '#003d7a',
          light: '#ffffff',
          dark: '#1a1a1a',
          muted: '#c2baba',
          accent: '#FF6B35',
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in-out',
        slideUp: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        slideDown: 'slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeft: 'slideLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        slideRight: 'slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        bounce: 'bounce 2s ease-in-out infinite',
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        scaleIn: 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        wiggle: 'wiggle 1s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        rotate: 'rotate 20s linear infinite',
        morph: 'morph 8s ease-in-out infinite',
        blob: 'blob 7s ease-in-out infinite',
        gradient: 'gradient 15s ease infinite',
        wave: 'wave 3s ease-in-out infinite',
        fadeInUp: 'fadeInUp 1s ease-out',
        slideInDiagonal: 'slideInDiagonal 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        zoomIn: 'zoomIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        flip: 'flip 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(255, 107, 53, 0.4)', filter: 'brightness(1)' },
          '50%': { boxShadow: '0 0 60px rgba(255, 107, 53, 0.8)', filter: 'brightness(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0) scaleY(1)' },
          '50%': { transform: 'translateX(-25%) scaleY(0.95)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInDiagonal: {
          '0%': { opacity: '0', transform: 'translate(-50px, 50px)' },
          '100%': { opacity: '1', transform: 'translate(0, 0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        flip: {
          '0%': { transform: 'rotateY(0)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-diagonal': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(220, 90%, 40%, 1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(15, 100%, 60%, 1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(220, 90%, 50%, 1) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(255, 107, 53, 0.5)',
        'glow-lg': '0 0 50px rgba(255, 107, 53, 0.6)',
        'glow-xl': '0 0 70px rgba(255, 107, 53, 0.8)',
        'glow-blue': '0 0 30px rgba(0, 61, 122, 0.5)',
        'glow-blue-lg': '0 0 50px rgba(0, 61, 122, 0.6)',
        'artistic': '0 10px 40px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        'hover-artistic': '0 20px 60px -15px rgba(255, 107, 53, 0.5), 0 0 0 1px rgba(255, 107, 53, 0.2)',
        'inner-glow': 'inset 0 0 30px rgba(255, 107, 53, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        'artistic': '30% 70% 70% 30% / 30% 30% 70% 70%',
        'blob': '60% 40% 30% 70% / 60% 30% 70% 40%',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
    },
  },
  plugins: [],
}
