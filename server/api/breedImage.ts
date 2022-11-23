// import { useFetch } from '#imports'

const history: Record<string, any> = {};

const rateLimit = (ip: string | undefined, timeout = 20 * 1000) => {
    if (!ip) return
    if (history[ip] > Date.now() - timeout) {
    throw new Error("Rate Limit Exceeded");
    }
    history[ip] = Date.now();
}

export default defineEventHandler(async (event) => {
    const ip = event.node.req.socket.remoteAddress || ''
    try {
        rateLimit(ip)
    }
    catch (error) {
        return { statusCode: 429, message: `Please wait another ${10 - (Math.abs(Date.now() - history[ip]) / 1000)}seconds` }
    }

    const { breed } = await getQuery(event)
    if (!breed) {
        return {
            statusCode: 422,
            message: 'Missing query OR body required'
        }
    }

    const config = useRuntimeConfig()

    const data = await $fetch(`https://api.thecatapi.com/v1/images/search?limit=10?breed_ids=${breed}?api_key=${config.apiKey}`)

    return data
})
