import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ApiModule } from './api.module'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from './modules/auth/auth.guard'

const logger = new Logger('Bootstrap')

async function bootstrap() {
  const api = await NestFactory.create<NestExpressApplication>(ApiModule)

  const configService = api.get(ConfigService)
  const apiHost = configService.get('api.host')
  const apiPort = configService.get('api.port')

  const reflector = api.get(Reflector)
  api.useGlobalGuards(new AuthGuard(reflector))

  await api.listen(apiPort, apiHost, () => {
    logger.log(`The server is listening on http://${apiHost}:${apiPort}`)
  })
}

bootstrap().catch((err) => {
  logger.error(err)

  process.exit(1)
})
