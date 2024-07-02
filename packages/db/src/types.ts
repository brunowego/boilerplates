import type { z } from 'zod'

import type { PostgresJsDatabase } from './orm'
import type * as schema from './schema'
import type {
  selectUserSchema,
  insertUserSchema,
  selectProductSchema,
  insertProductSchema,
  selectReviewSchema,
  insertReviewSchema,
} from './schemas'

export type Db = PostgresJsDatabase<typeof schema>

export type User = z.infer<typeof selectUserSchema>
export type InsertUser = z.infer<typeof insertUserSchema>

export type Product = z.infer<typeof selectProductSchema>
export type InsertProduct = z.infer<typeof insertProductSchema>

export type Review = z.infer<typeof selectReviewSchema>
export type InsertReview = z.infer<typeof insertReviewSchema>
