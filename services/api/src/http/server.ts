import { Elysia } from 'elysia'

import { staticPlugin } from '@elysiajs/static'

import { env } from '@/env'

import { HttpException } from './exceptions'
import { useCors, useHelmet, useSwagger } from './middlewares'
import {
  getHealth,
  signUp,
  signIn,
  getProfile,
  getFiles,
  getFileDetails,
  getTotalFiles,
  createFile,
  deleteFile,
} from './routes'

const app = new Elysia()
  .error({
    HTTP_EXCEPTION: HttpException,
  })

  .onError(({ code, error }) => {
    switch (code) {
      case 'HTTP_EXCEPTION':
        return error.intoResponse()
    }
  })

  .use(useCors)
  .use(useHelmet)

  .use(
    staticPlugin({
      prefix: '/static',
      assets: './static',
    }),
  )

  .use(getHealth)
  .group('/auth', (app) => app.use(signUp).use(signIn))
  .group('/files', (app) =>
    app
      .use(getFiles)
      .use(getFileDetails)
      .use(getTotalFiles)
      .use(createFile)
      .use(deleteFile),
  )
  .use(getProfile)

env.NODE_ENV !== 'production' && app.use(useSwagger)

app.listen(
  {
    port: env.PORT,
    hostname: env.HOST,
  },
  (server) => {
    console.log(
      `Server is listening on http://${server.hostname}:${server.port}`,
    )
  },
)
