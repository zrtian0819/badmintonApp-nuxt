// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/badmintonApp-nuxt/' // 替換為你的倉庫名稱
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint','@nuxtjs/tailwindcss']
})