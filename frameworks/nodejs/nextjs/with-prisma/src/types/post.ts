import { z } from 'zod'

import { postSchema } from '@/schemas/post'

export type PostType = z.infer<typeof postSchema>
