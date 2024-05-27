import z from '@acme/ui/lib/zod'

export const insertProductSchema = z.object({
  description: z.string(),
})
