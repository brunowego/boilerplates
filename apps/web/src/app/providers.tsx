'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { type ReactNode, type JSX, useState } from 'react'

import { bundledEnv } from '@/env'

if (bundledEnv.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('@/mocks')
}

export default function Providers({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
