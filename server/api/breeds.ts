// import { useFetch } from '#imports'

export default defineEventHandler(async (event) => {

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
  