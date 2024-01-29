import { createRoute } from '@hono/zod-openapi'
import { MiddlewareHandler } from 'hono'

import { CustomHono } from '../types'
import { signInRoute } from '../routes/auth/schema'
import { meRoute } from '../routes/users/schema'
// import { signInRateLimiter, rateLimiter } from './rate-limiter'
import authMiddleware from './auth-middleware'
import {
  createOrganizationRoute,
  deleteUserFromOrganizationRoute,
  getOrganizationByIdOrSlugRoute,
  getOrganizationsRoute,
} from '../routes/organizations/schema'
import organizationAuthMiddleware from './organization-auth-middleware'

const routesMiddlewares: {
  route: ReturnType<typeof createRoute>
  middlewares: MiddlewareHandler[]
}[] = [
  // {
  //   route: signInRoute,
  //   middlewares: [signInRateLimiter()],
  // },
  {
    route: meRoute,
    middlewares: [authMiddleware()],
  },
  // {
  //   route: getUserMenuRoute,
  //   middlewares: [authMiddleware()],
  // },
  // {
  //   route: getUsersRoute,
  //   middlewares: [authMiddleware(['ADMIN'])],
  // },
  // {
  //   route: getUserByIdOrSlugRoute,
  //   middlewares: [authMiddleware()],
  // },
  // {
  //   route: updateUserRoute,
  //   middlewares: [authMiddleware()],
  // },
  // {
  //   route: deleteUserRoute,
  //   middlewares: [authMiddleware()],
  // },
  {
    route: createOrganizationRoute,
    middlewares: [authMiddleware()],
  },
  {
    route: getOrganizationsRoute,
    middlewares: [
      authMiddleware(),
      // rateLimiter({
      //   points: 1,
      //   duration: 60,
      // }),
    ],
  },
  {
    route: getOrganizationByIdOrSlugRoute,
    middlewares: [authMiddleware(), organizationAuthMiddleware()],
  },
  // {
  //   route: getUsersByOrganizationIdRoute,
  //   middlewares: [authMiddleware(), organizationAuthMiddleware()],
  // },
  // {
  //   route: updateOrganizationRoute,
  //   middlewares: [authMiddleware(), organizationAuthMiddleware(['ADMIN'])],
  // },
  // {
  //   route: updateUserInOrganizationRoute,
  //   middlewares: [authMiddleware(), organizationAuthMiddleware(['ADMIN'])],
  // },
  // {
  //   route: inviteUserToOrganizationRoute,
  //   middlewares: [authMiddleware(), organizationAuthMiddleware(['ADMIN'])],
  // },
  // {
  //   route: getPersonalUploadTokenRoute,
  //   middlewares: [authMiddleware()],
  // },
  // {
  //   route: getOrganizationUploadTokenRoute,
  //   middlewares: [authMiddleware(), organizationAuthMiddleware()],
  // },
  // {
  //   route: deleteOrganizationRoute,
  //   middlewares: [authMiddleware(['ADMIN'])],
  // },
  {
    route: deleteUserFromOrganizationRoute,
    middlewares: [authMiddleware(), organizationAuthMiddleware(['ADMIN'])],
  },
]

export const guard = (app: CustomHono) => {
  for (const { route, middlewares } of routesMiddlewares) {
    app[route.method as 'get' | 'post' | 'put' | 'delete'](
      route.getRoutingPath(),
      ...middlewares,
    )
  }
}
