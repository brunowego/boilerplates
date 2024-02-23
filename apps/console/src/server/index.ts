import { publicProcedure, router } from './trpc'

export const appRouter = router({
  greeting: publicProcedure.query(() => 'hello tRPC v11!'),
})

export type AppRouter = typeof appRouter
