import { object, string, minLength, maxLength } from '@acme/ui/lib/valibot'

export const insertProductSchema = object({
  title: string([minLength(1), maxLength(50)]),
  handle: string([minLength(1), maxLength(50)]),
  price: string(),
})
