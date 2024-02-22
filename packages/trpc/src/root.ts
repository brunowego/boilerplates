import { workspaceRouter } from './routers/workspace'
import { router } from './setup/trpc'

export const appRouter = router({
  workspace: workspaceRouter,
})

export type AppRouter = typeof appRouter
