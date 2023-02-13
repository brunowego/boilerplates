import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TerminusModule } from '@nestjs/terminus'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloFederationDriverConfig, ApolloFederationDriver } from '@nestjs/apollo'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'

@Module({
  imports: [
    HttpModule,
    TerminusModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
    ClientsModule.register([
      {
        transport: Transport.NATS,
        name: 'serviceMesh',
        options: {
          servers: ['http://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, PostResolver],
})
export class PostModule {}
