// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
   runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000'
    }
  },
  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxt/ui',
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      bodyAttrs: {
        class: 'font-semibold'
      }
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: { primary: '#1DFE69', secondary: '#1DFEAD', dark: '#262626', darker: '#1D1D1D' },
        }
      }
    }
  }
})