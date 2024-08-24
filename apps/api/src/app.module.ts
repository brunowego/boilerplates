import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import appConfig from './common/configs/app.config'
import { configValidationSchema as validationSchema } from './common/validations/config.validation'
import { HealthCheckModule } from './modules/health-check/health-check.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema,
    }),
    HealthCheckModule,
  ],
})
export class AppModule {}
