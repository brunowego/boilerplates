import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export async function enableMSW() {
  console.log('MODE', env.MODE)

  if (env.MODE !== 'test') return

  await worker.start()
}
