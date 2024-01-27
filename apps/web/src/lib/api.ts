import { hc /*, InferResponseType*/ } from 'hono/client'
import type { AppRoute } from '@acme/api'
import { publicEnv as penv } from '@/env'

export const api = hc<AppRoute>(`${penv.NEXT_PUBLIC_BASE_URL}/api`)

// export type User = InferResponseType<typeof api.me.$get>['user']

// https://github.com/meech-ward/bun_hono_react_kinde/blob/main/src/app.ts
