import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { configValidationSchema as validationSchema } from './common/validations/config.validation'
import appConfig from './common/configs/app.config'
import mongoConfig from './common/configs/mongo.config'
import { HealthCheckModule } from './modules/health-check/health-check.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validationSchema,
      load: [appConfig, mongoConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('mongo.connectionString'),
      }),
      inject: [ConfigService],
    }),
    HealthCheckModule,
    UserModule,
  ],
})
export class AppModule {}
