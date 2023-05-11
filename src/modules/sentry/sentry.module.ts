import { Module, DynamicModule } from '@nestjs/common'
import { SentryService } from './sentry.service'
import { SENTRY_OPTIONS } from './sentry.constants'
import { NodeOptions } from '@sentry/node'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { SentryInterceptor } from './sentry.interceptor'
import { SentryModuleAsyncOptions } from './sentry.interface'
import '@sentry/tracing'

@Module({
  providers: [SentryService],
  exports: [SentryService],
})
export class SentryModule {
  static forRoot(options: NodeOptions): DynamicModule {
    return {
      module: SentryModule,
      providers: [
        {
          provide: SENTRY_OPTIONS,
          useValue: <NodeOptions>{
            ...options,
            dsn: process.env.SENTRY_DSN,
            integrations: [],
          },
        },
        SentryService,
        {
          provide: APP_INTERCEPTOR,
          useClass: SentryInterceptor,
        },
      ],
      exports: [SentryService],
    }
  }

  static forRootAsync(options: SentryModuleAsyncOptions): DynamicModule {
    return {
      module: SentryModule,
      imports: options.imports || [],
      providers: [
        {
          provide: SENTRY_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        SentryService,
        {
          provide: APP_INTERCEPTOR,
          useClass: SentryInterceptor,
        },
      ],
      exports: [SentryService],
    }
  }
}
