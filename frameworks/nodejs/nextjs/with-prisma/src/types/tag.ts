import { z } from 'zod'

import { tagSchema } from '@/schemas/tag'

export type TagType = z.infer<typeof tagSchema>
