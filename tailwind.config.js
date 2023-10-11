module.exports = {
  prefix: 'tw-',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './nuxt.config.ts'
  ],
  darkMode: 'media',
  theme: {
    extend: {
      borderWidth: {
        3: '3px'
      },
      padding: {
        '3/5': '60%',
        '1/2': '50%',
        full: '100%'
      },
      minWidth: {
        4: '1rem',
        8: '2rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem'
      },
      height: {
        100: '25rem',
        104: '26rem',
        108: '27rem',
        112: '28rem',
        116: '29rem',
        120: '30rem',
        124: '31rem',
        128: '32rem',
        132: '33rem'
      },
      aspectRatio: {
        '22/9': '22 / 9',
        '9/16': '9 / 16',
        '11/16': '11 / 16',
        '11/13': '11 / 13',
        '16/12': '16 / 12',
        '16/10': '163 / 100'
      },
      borderRadius: {
        '4xl': '1rem',
        '4.5xl': '1rem'
      },
      fontSize: {
        // 'lg': '1rem',
        '1.5xl': '1.375rem',
        '4.5xl': '2.5rem'
      },
      boxShadow: {
        'inner-2xl': 'inset 0 10px 8px 0 rgb(0 0 0 / 0.05)',
        default: '0 1px 6px rgba(32,33,36,.28)'
      },
      spacing: {
        35: '8.75rem',
        '90vw': '90vw'
      }
    },
    listStyleType: {
      dash: '"  -  "'
    },
    // TODO: Check all colors once the project is done, remove redundant colors and rename the rest
    colors: {
      primary: '#0fbe76',
      default: '#616161',
      white: '#ffffff',
      'gray-100': '#F3F4F6',
      'gray-200': '#E5E7EB',
      'gray-300': '#D1D5DB',
      'gray-400': '#9CA3AF',
      'gray-500': '#6B7280',
      'blue-400': '#60a5fa',
      transparent: 'transparent',
      background: '#f2f4f5'
    },
    keyframes: {
      pulse: {
        '0%, 100%': { opacity: 0 },
        '50%': { opacity: 1 }
      }
    }
  }
}
