import { Elysia } from 'elysia'

import { isAuthenticated } from '@/http/middlewares/auth'

export const getProfile = new Elysia()
  .use(isAuthenticated)
  .get('/me', ({ user }) => {
    return user
  })
