import type { HttpHandler } from 'msw'

import { handlers as metricsHandlers } from './api/v1/metrics'

export const handlers = [...metricsHandlers] satisfies HttpHandler[]
