import { workflow } from '@novu/framework'

import z from '@acme/ui/lib/zod'

export const controlSchema = z.object({
  subject: z.string().default('New Inbox Message'),
})

export type ControlSchema = z.infer<typeof controlSchema>

export const payloadSchema = z.object({
  description: z.string(),
  recordId: z.string(),
  from: z.string().optional(),
  to: z.string().optional(),
  type: z.enum(['transaction', 'transactions', 'inbox', 'match']),
})

const inboxNewInAppWorkflow = workflow(
  'inbox_new_in_app',
  async ({ step, payload }) => {
    await step.inApp(
      'send_in_app',
      async (controls: ControlSchema) => {
        return {
          subject: controls.subject,
          body: `${payload.description}`,
        }
      },
      {
        controlSchema,
      },
    )
  },
  {
    payloadSchema,
  },
)

export default inboxNewInAppWorkflow
