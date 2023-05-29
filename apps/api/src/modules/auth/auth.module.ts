import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '@nestjs/config'
import { HeaderApiKeyStrategy } from './header-api-key.strategy'

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [HeaderApiKeyStrategy],
})
export class AuthModule {}
