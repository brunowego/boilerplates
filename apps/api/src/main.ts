import { Logger } from '@nestjs/common'
import otelSDK from './tracing'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ApiModule } from './api.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import * as fs from 'fs'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as pkg from '../package.json'

const logger = new Logger('Bootstrap')

async function bootstrap() {
  if (process.env.OPENTELEMETRY_ENABLED === 'true') {
    logger.log('OpenTelemetry is active')

    await otelSDK.start()
  }

  const api = await NestFactory.create<NestExpressApplication>(ApiModule)

  const configService = api.get(ConfigService)
  const apiHost = configService.get('api.host')
  const apiPort = configService.get('api.port')

  api.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  api.useGlobalInterceptors(new ClassSerializerInterceptor(api.get(Reflector)))

  api.use(bodyParser.raw({ type: 'application/octet-stream', limit: '20mb' }))
  api.use(cookieParser())
  api.set('trust proxy', true)

  await fs.promises.mkdir('./data/uploads/_temp', { recursive: true })

  api.setGlobalPrefix('api')

  SwaggerModule.setup(
    'docs',
    api,
    SwaggerModule.createDocument(
      api,
      new DocumentBuilder().setTitle(pkg.name).setVersion(pkg.version).addBearerAuth().build()
    )
  )

  await api.listen(apiPort, apiHost, () => {
    logger.log(`The server is listening on http://${apiHost}:${apiPort}`)
  })
}
bootstrap()
