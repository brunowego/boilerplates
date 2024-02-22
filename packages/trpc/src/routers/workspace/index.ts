import { workspacesTable } from '@acme/db/schema'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

import { router, protectedProcedure } from '../../setup/trpc'
import { eq } from '../../lib/db/orm'

export const workspaceRouter = router({
  getWorkspaceIdByNamespace: protectedProcedure
    .input(z.object({ namespace: z.string() }))
    .output(z.string())
    .query(async ({ ctx, input }) => {
      const [result] = await ctx.db
        .select()
        .from(workspacesTable)
        .where(eq(workspacesTable.namespace, input.namespace))

      if (!result) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Workspace not found',
        })
      }

      return result.id
    }),
  getWorkspaceById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .output(z.string())
    .query(async ({ ctx, input }) => {
      const [result] = await ctx.db
        .select()
        .from(workspacesTable)
        .where(eq(workspacesTable.id, input.id))

      if (!result) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Workspace not found',
        })
      }

      return result.id
    }),
  getWorkspaces: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(workspacesTable)
  }),
})

export type WorkspaceRouter = typeof workspaceRouter
