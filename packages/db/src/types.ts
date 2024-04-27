import type { InferSelectModel } from 'drizzle-orm'

import type { usersTable, sessionTable, tokensTable } from './schema'

export enum Environment {
  development = 'development',
  test = 'test',
  production = 'production',
}

export type User = InferSelectModel<typeof usersTable, { dbColumnNames: true }>
export type Session = typeof sessionTable.$inferSelect
export type Token = typeof tokensTable.$inferSelect
