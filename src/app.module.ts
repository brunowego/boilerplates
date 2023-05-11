import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SentryModule } from './modules/sentry/sentry.module'
import { AppConfig, SentryConfig } from './common/configs'
import { configValidationSchema as validationSchema } from './common/validations/config.validation'
import { ConfigService } from '@nestjs/config'
import { BeatModule } from './modules/beat/beat.module'
import { HealthModule } from './modules/health/health.module'
import { UserModule } from './modules/user/user.module'
import { PostModule } from './modules/post/post.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
      validationSchema,
    }),
    // SentryModule.forRoot({
    //   tracesSampleRate: 1.0,
    //   debug: process.env.NODE_ENV !== 'production',
    //   environment: process.env.NODE_ENV,
    // }),
    SentryModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [SentryConfig],
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        dsn: configService.get<string>('sentry.dsn'),
        debug: configService.get<boolean>('sentry.debug'),
        environment: configService.get<string>('sentry.environment'),
      }),
      inject: [ConfigService],
    }),
    BeatModule,
    HealthModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
