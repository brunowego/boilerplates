import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import apiConfig from './common/configs/api.config'
import { configValidationSchema as validationSchema } from './common/validations/config.validation'
import { AuthModule } from './modules/auth/auth.module'
import { BeatModule } from './modules/beat/beat.module'
import { HealthModule } from './modules/health/health.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
      validationSchema,
    }),
    AuthModule,
    BeatModule,
    HealthModule,
  ],
})
export class ApiModule {}
