import { serve } from '@novu/framework/next'

import { inboxNewInAppWorkflow } from '@/lib/novu/workflows'

export const { GET, POST, OPTIONS } = serve({
  workflows: [inboxNewInAppWorkflow],
})
