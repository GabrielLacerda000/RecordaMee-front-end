// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
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
    'nuxt-toast'
  ],
  app: {
    head: {
      bodyAttrs: {
        class: 'font-semibold font-mono'
      }
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})