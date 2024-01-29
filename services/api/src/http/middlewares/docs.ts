import { swaggerUI } from '@hono/swagger-ui'

import { CustomHono } from '../types'
import { name as title, version } from '../../../package.json'

const openAPITags = [
  { name: 'auth', description: 'Authentication' },
  { name: 'users', description: 'Users' },
  { name: 'organizations', description: 'Organizations' },
  { name: 'public', description: 'Public' },
]

export const docs = (app: CustomHono) => {
  // const registry = app.openAPIRegistry

  // registry.registerComponent('securitySchemes', 'cookieAuth', {
  //   type: 'apiKey',
  //   in: 'cookie',
  //   name: `${config.slug}-session`,
  //   description:
  //     "Authentication cookie. If you don't have it, you need to sign in or sign up first.",
  // })

  app.doc31('/openapi.json', {
    openapi: '3.1.0',
    info: {
      title,
      version,
    },
    security: [{ cookieAuth: [] }],
    tags: openAPITags,
  })

  app.get(
    '/docs',
    swaggerUI({
      url: '/openapi.json',
    }),
  )
}
