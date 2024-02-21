import { workspaceRouter } from './routers/workspace'
import { createRouter } from './setup/trpc'

export const appRouter = createRouter({
  workspace: workspaceRouter,
})

export type AppRouter = typeof appRouter
