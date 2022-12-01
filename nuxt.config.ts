// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        apiKey: '',
    },
    routeRules: {
        '/api/**': { cors: true },
    }
})
