import { createTRPCReact } from '@trpc/react-query'

import { type AppRouter } from '@acme/trpc'

export { httpBatchLink } from '@trpc/react-query'

export const trpc: ReturnType<typeof createTRPCReact<AppRouter>> =
  createTRPCReact<AppRouter>()
