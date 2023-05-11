import {
  Injectable,
  Scope,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { SentryService } from './sentry.service'
import { Observable, catchError, throwError, finalize } from 'rxjs'
import { captureException } from '@sentry/node'

@Injectable({ scope: Scope.REQUEST })
export class SentryInterceptor implements NestInterceptor {
  constructor(private readonly sentryService: SentryService) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    const span = this.sentryService.startChild({ op: `route handler` })

    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException || error.constructor.name === 'HttpException') {
          if ((error as HttpException).getStatus() < HttpStatus.INTERNAL_SERVER_ERROR) {
            return
          }
        }

        // if (error instanceof ApolloError) {
        //   return
        // }

        captureException(error, this.sentryService.span.getTraceContext())

        return throwError(() => error)
      }),
      finalize(() => {
        span.finish()

        this.sentryService.span.finish()
      })
    )
  }
}
