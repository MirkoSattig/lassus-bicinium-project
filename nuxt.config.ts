import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir:"src/",
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
  ],
  content: {
    // ... options
    sources: {
      root: {
        driver: "fs",
        //prefix: ’/root’,
        base: fileURLToPath(new URL ("./content", import.meta.url)),
      }
    }
  }
})
