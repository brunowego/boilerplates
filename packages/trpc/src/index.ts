import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import type { AppRouter } from './root'

export { fetchRequestHandler } from '@trpc/server/adapters/fetch'

export * from './setup/context'
export * from './root'

export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>
