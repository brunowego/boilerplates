import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/modules/user/entities/user.entity'
import { UserProfileEntity } from '@/modules/user/entities/user-profile.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('postgres.host'),
        port: configService.get<number>('postgres.port'),
        username: configService.get<string>('postgres.username'),
        password: configService.get<string>('postgres.password'),
        database: configService.get<string>('postgres.database'),
        synchronize: configService.get<string>('app.environment') !== 'production',
        entities: [UserEntity, UserProfileEntity],
        ssl: configService.get<string>('postgres.certificate') && {
          ca: Buffer.from(configService.get<string>('postgres.certificate'), 'base64').toString(
            'ascii'
          ),
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
