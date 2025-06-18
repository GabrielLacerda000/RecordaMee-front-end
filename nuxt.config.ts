// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/fonts'
  ],
  app: {
    head: {
      bodyAttrs: {
        class: 'bg-black text-white font-semibold font-mono'
      }
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})