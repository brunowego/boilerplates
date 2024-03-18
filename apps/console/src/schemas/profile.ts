import { z } from 'zod'

export const profileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().max(50).optional(),
})
