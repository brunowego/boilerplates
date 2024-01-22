import type Elysia from 'elysia'

import { HttpException } from '@/http/exceptions'

export const initExceptions = (app: Elysia) => {
  app
    .error({
      HTTP_EXCEPTION: HttpException,
    })

    .onError(({ code, error }) => {
      switch (code) {
        case 'HTTP_EXCEPTION':
          return error.intoResponse()
      }
    })
}

export * from './http'
