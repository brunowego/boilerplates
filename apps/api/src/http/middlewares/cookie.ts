import type Elysia from 'elysia'

import { cookie } from '@elysiajs/cookie'

export const useCookie = (app: Elysia) => app.use(cookie())
