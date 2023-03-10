import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { appConfig, sentryConfig } from './common/configs'
import { configValidationSchema as validationSchema } from './common/validations/config.validation'
import { BeatModule } from './modules/beat/beat.module'
import { HealthModule } from './modules/health/health.module'
import { UserModule } from './modules/user/user.module'
import { PostModule } from './modules/post/post.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { SentryInterceptor } from './common/interceptors/sentry.interceptor'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, sentryConfig],
      validationSchema,
    }),
    BeatModule,
    HealthModule,
    UserModule,
    PostModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: SentryInterceptor }],
})
export class AppModule {}
