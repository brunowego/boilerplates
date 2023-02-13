import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TerminusModule } from '@nestjs/terminus'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloFederationDriverConfig, ApolloFederationDriver } from '@nestjs/apollo'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'

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
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule {}
