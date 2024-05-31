import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { domainsTable } from './schema'

export const selectDomainSchema = createSelectSchema(domainsTable)

export const insertDomainSchema = createInsertSchema(domainsTable, {
  domain: z.string().min(1),
})

export type Domain = z.infer<typeof selectDomainSchema>
export type InsertDomain = z.infer<typeof insertDomainSchema>
