'use client'

import { type ReactNode, type JSX } from 'react'

import {
  queryClient,
  QueryClientProvider,
  // ReactQueryStreamedHydration,
  ReactQueryDevtools,
} from '@/lib/react-query'

export function ReactQueryProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryStreamedHydration> */}
      {children}
      {/* </ReactQueryStreamedHydration> */}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
