import colors from 'tailwindcss/colors'

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        'green-primary': '#1DFE69',
        'green-secondary': '#1DFEAD',
        'white-primary': '#F5F5F5',
        dark: {
          default: '#1A1A1A',           
          light: '#262626'      
        },
        success: '#2E7D32',     
        white: '#FFFFFF',  
        ...colors
      }
    }
  }
}