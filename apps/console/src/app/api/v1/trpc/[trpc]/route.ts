import {
  fetchRequestHandler,
  appRouter as router,
  createContext,
} from '@acme/trpc'

const handler = (req: Request): Promise<Response> =>
  fetchRequestHandler({
    endpoint: '/api/v1/trpc',
    req,
    router,
    createContext,
  })

export { handler as GET, handler as POST }
