import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },
  srcDir:'src/',
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxt/ui'
  ],
  vite: {
    optimizeDeps: {
      exclude: ['verovio']
    }
  },
  nitro: {
    publicAssets: [
      {
        baseURL: 'kern/lassus-bicinia',
        dir: fileURLToPath(new URL('./lassus-bicinia/kern', import.meta.url)),
        maxAge: 3600,
      },
      {
        baseURL: 'kern',
        dir: fileURLToPath(new URL('./kern', import.meta.url)),
      },
    ],
  },
  content: {
    // ... options
    sources: {
      root: {
        driver: 'fs',
        //prefix: ’/root’,
        base: fileURLToPath(new URL ('./content', import.meta.url)),
      }
    }
  }
})
