import z from '@acme/ui/lib/zod'

export const insertProductSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string(),
})
