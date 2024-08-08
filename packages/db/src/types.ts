import type { z } from 'zod'

import type { selectWorkspaceSchema, insertWorkspaceSchema } from './schemas'

export type Workspace = z.infer<typeof selectWorkspaceSchema>
export type InsertWorkspace = z.infer<typeof insertWorkspaceSchema>
