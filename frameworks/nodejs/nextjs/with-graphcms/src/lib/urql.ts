import { ssrExchange, createClient, dedupExchange, cacheExchange, fetchExchange } from 'urql'
import { GRAPHCMS_URL } from '@/constants'

const isServerSide = typeof window === 'undefined'
const ssrCache = ssrExchange({ isClient: !isServerSide })

const client = createClient({
  url: GRAPHCMS_URL,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
})

export { client, ssrCache }
