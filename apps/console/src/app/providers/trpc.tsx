'use client'

import { type ReactNode, type JSX, useState } from 'react'
import superjson from 'superjson'

import { trpc, httpBatchLink } from '@/lib/trpc'
import { publicEnv as env } from '@/env/client'
import { queryClient } from '@/lib/react-query'

export function TrpcProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        // loggerLink({
        //   enabled: (opts) =>
        //     env.NODE_ENV === 'development' ||
        //     (opts.direction === 'down' && opts.result instanceof Error),
        // }),
        httpBatchLink({
          url: `${env.NEXT_PUBLIC_BASE_URL}/api/v1/trpc`,
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  )
}
