import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './app.module'

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const configService = app.get(ConfigService)
  const appHost = configService.get('app.host')
  const appPort = configService.get('app.port')

  await app.listen(appPort, appHost)
}

bootstrap()
