import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { workspacesTable } from './schema'

export const selectWorkspaceSchema = createSelectSchema(workspacesTable)
export const insertWorkspaceSchema = createInsertSchema(workspacesTable, {
  name: z.string().min(2).max(20),
  slug: z.string().min(2).max(20),
})

export type Workspace = z.infer<typeof selectWorkspaceSchema>
export type InsertWorkspace = z.infer<typeof insertWorkspaceSchema>
