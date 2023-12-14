import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    MEDUSA_ADMIN_API_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_MEDUSA_BACKEND_URL: z.string().url(),
  },
  runtimeEnv: {
    MEDUSA_ADMIN_API_TOKEN: process.env.MEDUSA_ADMIN_API_TOKEN,
    NEXT_PUBLIC_MEDUSA_BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
  },
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
})
