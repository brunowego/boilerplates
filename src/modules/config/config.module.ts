import * as Joi from 'joi'
import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import appConfig from './app.config'
import databaseConfig from './database.config'

const validationSchema = Joi.object({
  // App
  TZ: Joi.string().default('UTC'),
  PORT: Joi.number().default(3000),
  SECRET_KEY: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),

  // URLs
  PUBLIC_URL: Joi.string().default('http://localhost:3000'),

  // Database
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),
  POSTGRES_SSL_CERT: Joi.string().allow(''),
})

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [appConfig, databaseConfig],
      validationSchema: validationSchema,
    }),
  ],
})
export class ConfigModule {}
