import { Module } from '@nestjs/common'
import { ConfigModule } from './modules/config/config.module'
import { BeatModule } from './modules/beat/beat.module'
import { HealthModule } from './modules/health/health.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [ConfigModule, BeatModule, HealthModule, UserModule],
})
export class AppModule {}
