import z from '@acme/ui/lib/zod'

export const insertPersonalSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
  language: z.string().length(2),
  timezone: z.string().min(1),
})
