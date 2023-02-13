import { Module } from '@nestjs/common'
import { ConfigModule } from './modules/config/config.module'
import { BeatModule } from './modules/beat/beat.module'
import { HealthModule } from './modules/health/health.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo'
import { IntrospectAndCompose } from '@apollo/gateway'

@Module({
  imports: [
    ConfigModule,
    BeatModule,
    HealthModule,
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'user', url: 'http://localhost:3001/graphql' },
            { name: 'post', url: 'http://localhost:3002/graphql' },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}
