'use client'

import { QueryClient } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { MedusaProvider as Provider } from 'medusa-react'
import { type ReactNode, type JSX, useState } from 'react'

import { publicEnv as penv } from '@/env'

export function MedusaProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 5 * 1000, // 5 seconds
          },
        },
      }),
  )

  return (
    <Provider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl={penv.NEXT_PUBLIC_MEDUSA_BACKEND_URL}
      publishableApiKey={penv.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY}
    >
      {children}

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </Provider>
  )
}
