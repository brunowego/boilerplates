import { z } from 'zod'

const UsersQuerySchema = z.object({
  search: z.string().optional(),
})

export const getUsersQuerySchema = UsersQuerySchema.merge(
  z.object({
    sort: z
      .enum(['createdAt', 'firstName', 'lastName'])
      .optional()
      .default('createdAt'),
    page: z.coerce.number().optional(),
  }),
)

export const getUsersCountQuerySchema = UsersQuerySchema
