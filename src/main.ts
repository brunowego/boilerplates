import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from './common/services/prisma.service'
import { useContainer } from 'class-validator'

const logger = new Logger('Bootstrap')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const configService = app.get(ConfigService)
  const appHost = configService.get('app.host')
  const appPort = configService.get('app.port')

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  await app.listen(appPort, appHost, () => {
    logger.log(`The server is listening on http://${appHost}:${appPort}`)
  })
}

bootstrap().catch((err) => {
  logger.error(err)

  process.exit(1)
})
