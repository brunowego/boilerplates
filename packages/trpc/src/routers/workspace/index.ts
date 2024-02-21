import { workspacesTable } from '@acme/db/schema'

import { t } from '../../setup/trpc'

export const workspaceRouter = t.router({
  query: t.procedure.query(async ({ ctx }) => {
    return ctx.db.select().from(workspacesTable)
  }),
})

export type WorkspaceRouter = typeof workspaceRouter
