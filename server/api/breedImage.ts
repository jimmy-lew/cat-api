// import { useFetch } from '#imports'

export default defineEventHandler(async (event) => {

    const { breed } = await getQuery(event)
    if (!breed) {
        return {
            code: 422,
            message: 'Missing query OR body required'
        }
    }

    console.log(breed)

    const config = useRuntimeConfig()

    const data = await $fetch(`https://api.thecatapi.com/v1/images/search?limit=10?breed_ids=${breed}?api_key=${config.apiKey}`)

    return data
  })
  