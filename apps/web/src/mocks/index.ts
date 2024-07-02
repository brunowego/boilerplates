'use client'

import type { SetupWorkerApi } from 'msw/browser'
import type { SetupServerApi } from 'msw/node'

if (typeof window === 'undefined') {
  const server: SetupServerApi = require('./server').server

  server.listen({ onUnhandledRequest: 'bypass' })
} else {
  const worker: SetupWorkerApi = require('./worker').worker

  worker.start({ onUnhandledRequest: 'bypass' })
}
