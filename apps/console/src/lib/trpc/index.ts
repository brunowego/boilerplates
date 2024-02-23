import { createTRPCNext } from '@trpc/next'
import type { AppRouter } from '@/server'
import { httpBatchLink } from '@trpc/client'
import { ssrPrepass } from '@trpc/next/ssrPrepass'

import { publicEnv as env } from '@/env/client'

// export const trpc = createTRPCNext<AppRouter>({
//   config() {
//     return {
//       links: [
//         httpBatchLink({
//           url: `${env.NEXT_PUBLIC_BASE_URL}/api/v1/trpc`,
//           // async headers() {
//           //   return {}
//           // },
//         }),
//       ],
//     }
//   },
//   ssr: false,
// })

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    const { ctx } = opts

    if (typeof window !== 'undefined') {
      return {
        links: [
          httpBatchLink({
            url: '/api/v1/trpc',
          }),
        ],
      }
    }

    return {
      links: [
        httpBatchLink({
          url: `${env.NEXT_PUBLIC_BASE_URL}/api/v1/trpc`,
          headers() {
            if (!ctx?.req?.headers) {
              return {}
            }

            return {
              cookie: ctx.req.headers.cookie,
            }
          },
        }),
      ],
    }
  },
  ssr: true,
  ssrPrepass,
})
