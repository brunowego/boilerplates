import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import appConfig from './common/configs/app.config'
import { configValidationSchema as validationSchema } from './common/validations/config.validation'
import { AuthModule } from './modules/auth/auth.module'
import { HeartbeatModule } from './modules/heartbeat/heartbeat.module'
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module'
import { PaymentModule } from './modules/payment/payment.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema,
    }),
    AuthModule,
    HeartbeatModule,
    HealthcheckModule,
    PaymentModule,
  ],
})
export class AppModule {}
