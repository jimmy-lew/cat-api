const history: Record<string, any> = {};

const rateLimit = (ip: string | undefined, timeout = 20 * 1000) => {
    if (!ip) return
    if (history[ip] > Date.now() - timeout) {
    throw new Error("Rate Limit Exceeded");
    }
    history[ip] = Date.now();
}

export default defineEventHandler(async (event) => {
    try {
        const ip = event.node.req.socket.remoteAddress
        rateLimit(ip)
    }
    catch (error) {
        return { statusCode: 429, message: 'go fuck yourself' }
    }

    const config = useRuntimeConfig()

    const data = await $fetch(`https://api.thecatapi.com/v1/breeds?api_key=${config.apiKey}`).then((res: any) =>  {
        
        if (!Array.isArray(res)) return

        const filteredRes = res.map((cat) => {
            const { id } = cat
            console.log(id);
            return id
        })
        return filteredRes
    })

    return data
  })
  