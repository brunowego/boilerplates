import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import appConfig from './app.config'
import { configValidationSchema as validationSchema } from './config.validation'

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [appConfig],
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
