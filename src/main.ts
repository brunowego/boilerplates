import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { createYoga } from 'graphql-yoga'
import { buildSchema } from 'type-graphql'
import { resolvers } from '@/generated/typegraphql-prisma'
import { prisma } from './lib/prisma'

const logger = new Logger('Bootstrap')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(
    '/graphql',
    createYoga({
      graphiql: true,
      context: { prisma },
      schema: await buildSchema({
        resolvers: resolvers,
        validate: false,
      }),
    })
  )

  const configService = app.get(ConfigService)
  const appHost = configService.get('app.host')
  const appPort = configService.get('app.port')

  await app.listen(appPort, appHost, () => {
    logger.log(`The server is listening on http://${appHost}:${appPort}`)
  })
}

bootstrap().catch((err) => {
  logger.error(err)

  process.exit(1)
})
