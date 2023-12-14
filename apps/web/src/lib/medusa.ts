import Medusa from '@medusajs/medusa-js'

import { env } from '@acme/env/web'

const medusa = new Medusa({
  baseUrl: env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
  maxRetries: 3,
  apiKey: env.MEDUSA_ADMIN_API_TOKEN,
})

export default medusa
