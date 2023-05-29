import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from './modules/auth/auth.guard'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { name, version } from '../package.json'

const logger = new Logger('Bootstrap')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.setGlobalPrefix('v1')

  const configService = app.get(ConfigService)
  const appHost = configService.get('app.host')
  const appPort = configService.get('app.port')

  const reflector = app.get(Reflector)
  app.useGlobalGuards(new AuthGuard(reflector))

  SwaggerModule.setup(
    '/',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(name)
        .setVersion(version)
        .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'X-API-KEY')
        .build()
    )
  )

  await app.listen(appPort, appHost, () => {
    logger.log(`The server is listening on http://${appHost}:${appPort}`)
  })
}

bootstrap().catch((err) => {
  logger.error(err)

  process.exit(1)
})
