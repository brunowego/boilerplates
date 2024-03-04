import { z } from 'zod'

export const waitListSchema = z.object({
  firstName: z.string().min(1).max(50),
  email: z.string().email(),
})
