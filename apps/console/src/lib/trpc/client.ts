import { createTRPCNext } from '@trpc/next'
import superjson from 'superjson'
import { loggerLink, httpBatchLink } from '@trpc/client'

import { type AppRouter } from '@acme/trpc'

import { publicEnv as env } from '@/env/client'

export const trpc: ReturnType<typeof createTRPCNext<AppRouter>> =
  createTRPCNext<AppRouter>({
    config() {
      return {
        transformer: superjson,
        links: [
          loggerLink({
            enabled: (opts) =>
              process.env.NODE_ENV === 'development' ||
              (opts.direction === 'down' && opts.result instanceof Error),
          }),
          httpBatchLink({
            url: `${env.NEXT_PUBLIC_BASE_URL}/api/v1/trpc`,
          }),
        ],
      }
    },
    ssr: false,
  })
