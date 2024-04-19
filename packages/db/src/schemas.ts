import { z } from 'zod'

const UsernameAvailabilityQuerySchema = z.object({
  q: z.string().min(1),
})

export const checkUsernameAvailabilityQuerySchema =
  UsernameAvailabilityQuerySchema
