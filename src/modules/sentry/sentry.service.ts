import { Injectable, Scope, Inject } from '@nestjs/common'
import { SENTRY_OPTIONS } from './sentry.constants'
import { REQUEST } from '@nestjs/core'
import { init, startTransaction, getCurrentHub } from '@sentry/node'
import { Span, SpanContext } from '@sentry/types'
import { SentryConfigOptions } from './sentry.interface'

@Injectable({ scope: Scope.REQUEST })
export class SentryService {
  constructor(
    @Inject(SENTRY_OPTIONS) sentryConfigOptions: SentryConfigOptions,
    @Inject(REQUEST) private request: Request
  ) {
    init({
      ...sentryConfigOptions,
      normalizeDepth: 11,
    })

    const { method, headers, url } = this.request

    const transaction = startTransaction({
      name: `Route: ${method} ${url}`,
      op: 'transaction',
    })

    getCurrentHub().configureScope((scope) => {
      scope.setSpan(transaction)

      scope.setContext('http', {
        method,
        url,
        headers,
      })
    })
  }

  get span(): Span {
    return getCurrentHub().getScope().getSpan()
  }

  startChild(spanContext: SpanContext): Span {
    return this.span.startChild(spanContext)
  }
}
