import colors from 'tailwindcss/colors'

export default {
  theme: {
    extend: {
      colors: {
        'gray-primary': '#F5F5F5',
        'white-primary': '#FFFFFF',
        'green-primary': '#2E7D32',
        primary: {
          default: '#01C38D',    
          dark: '#132d46',       
          light: '#F5F5F5'      
        },
        success: '#2E7D32',     
        white: '#FFFFFF',  
        ...colors
      }
    }
  }
}