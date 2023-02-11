import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import appConfig from './app.config'
import { configValidationSchema as validationSchema } from './config.validation'

@Module({
  imports: [
    NestConfigModule.forRoot({
      // isGlobal: true,
      load: [appConfig],
      // envFilePath: `${process.cwd()}/.env`,
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
