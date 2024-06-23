import type { z } from 'zod'

import type { PostgresJsDatabase } from './orm'
import type * as schema from './schema'
import type {
  selectUserSchema,
  insertUserSchema,
  selectWorkspaceSchema,
  insertWorkspaceSchema,
} from './schemas'

export type Db = PostgresJsDatabase<typeof schema>

export type User = z.infer<typeof selectUserSchema>
export type InsertUser = z.infer<typeof insertUserSchema>

export type UserSession = {
  email: string
  image: string
}

export type Workspace = z.infer<typeof selectWorkspaceSchema>
export type InsertWorkspace = z.infer<typeof insertWorkspaceSchema>
