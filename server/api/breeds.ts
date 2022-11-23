const history: Record<string, any> = {};

const rateLimit = (ip: string, timeout = 20 * 1000) => {
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
  