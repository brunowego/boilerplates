import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import appConfig from './common/configs/app.config'
import { configValidationSchema as validationSchema } from './common/validations/config.validation'
import { BeatModule } from './modules/beat/beat.module'
import { HealthModule } from './modules/health/health.module'

/**
 * Main module
 *
 * @export AppModule
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema,
    }),
    BeatModule,
    HealthModule,
  ],
})
export class AppModule {}