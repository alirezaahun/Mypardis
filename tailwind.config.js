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
    keyframes: {
      pulse: {
        '0%, 100%': { opacity: 0 },
        '50%': { opacity: 1 }
      }
    },
    colors: {
      'transparent': 'rgba(0, 0, 0, 0)',
      'text-gray': '#616161',
      'white': '#ffffff',
      'dark': '#000000',
      'primary': '#444557',
      'primary-100': '#7d7e9f',
      'primary-200': '#6f708d',
      'primary-300': '#61627b',
      'primary-400': '#525369',
      'primary-500': '#444557',
      'primary-600': '#363745',
      'primary-700': '#282833',
      'blue-100': '#dbeafe',
      'blue-200': '#bfdbfe',
      'blue-300': '#93c5fd',
      'blue-400': '#60a5fa',
      'blue-500': '#0ea5e9',
      'blue-600': '#2563eb',
      'blue-700': '#1d4ed8',
      'blue-800': '#1e40af',
      'blue-900': '#1e3a8a',
      'red-100': '#fee2e2',
      'red-200': '#fecaca',
      'red-300': '#fca5a5',
      'red-400': '#f87171',
      'red-500': '#ef4444',
      'red-600': '#dc2626',
      'red-700': '#b91c1c',
      'red-800': '#991b1b',
      'red-900': '#7f1d1d',
      'gray-100': '#f3f4f6',
      'gray-200': '#e5e7eb',
      'gray-300': '#d1d5db',
      'gray-400': '#9ca3af',
      'gray-500': '#6b7280',
      'gray-600': '#4b5563',
      'gray-700': '#374151',
      'gray-800': '#1f2937',
      'gray-900': '#111827',
     }
  }
}
