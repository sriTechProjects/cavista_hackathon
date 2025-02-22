/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#03C988',
        'primary-hover': '#029966',
        'primary-txt': '#333333',
        'secondary-txt': '#c0c1bf',
        'primary-bg': '#f9f9f9',
        'primary-btn': '#333333',
        'primary-btn-hover': '#4d4d4d',
        'link': '#0077b5',

        'success': '#00D222',
        'success-op': 'rgba(0, 189, 64, 0.12)',
        'danger': '#FF0000',
        'danger-op': 'rgba(255, 0, 0, 0.12)',
        'sky': '#0897FF',
        'sky-op': 'rgba(8, 151, 255, 0.12)',
        'rose': '#FF5EF9',
        'rose-op':'rgba(246, 139, 255, 0.12)',
        'star': '#F8BD00',
        'star-op': 'rgba(248, 189, 0, 0.12)',

        // Adding dashboard-specific colors
        'dashboard': {
          'sidebar': {
            'active': '#03C988',    
            'hover': '#ebfef9',     
            'text': '#333333',      
            'icon': '#6b7280',     
          }
        }
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      gradientColorStops: theme => ({
        'primary': {
          'light': '#03C988',      // Your primary color
          'dark': '#02a06d',       // Darker shade of primary
        }
      }),
      boxShadow: {
        'sidebar': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 4px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}