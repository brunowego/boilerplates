import z from '@acme/ui/lib/zod'

export const insertProductSchema = z.object({
  title: z.string().min(1).max(50),
  handle: z.string().min(1).max(50),
  price: z.number().min(0),
})
