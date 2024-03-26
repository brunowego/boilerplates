import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const MAX_FILE_SIZE = 5000000 // 5MB

export const pictureSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.name !== undefined, 'Please upload an image.')
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Max image size is 5MB.')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    )
    .nullable(),
  intent: z.enum(['profile_picture']),
})
