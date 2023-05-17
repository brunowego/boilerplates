import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

const logger = new Logger('Bootstrap')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const configService = app.get(ConfigService)
  const appHost = configService.get('app.host')
  const appPort = configService.get('app.port')

  app.disable('x-powered-by')

  app.setGlobalPrefix('api')

  await app.listen(appPort, appHost, () => {
    logger.log(`The server is listening on http://${appHost}:${appPort}`)
  })
}

bootstrap().catch((err) => {
  logger.error(err)

  process.exit(1)
})
