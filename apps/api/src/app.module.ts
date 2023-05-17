import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import appConfig from './common/configs/app.config'
import { configValidationSchema as validationSchema } from './common/validations/config.validation'
import { HeartbeatModule } from './modules/heartbeat/heartbeat.module'
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema,
    }),
    HeartbeatModule,
    HealthcheckModule,
  ],
})
export class AppModule {}
