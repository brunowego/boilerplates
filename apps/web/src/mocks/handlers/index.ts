import type { HttpHandler } from 'msw'

import { handlers as usersHandlers } from './api/users'

export const handlers = [...usersHandlers] satisfies HttpHandler[]
