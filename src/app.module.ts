import { Module } from '@nestjs/common'
import { ConfigModule } from './modules/config/config.module'
import { DatabaseModule } from './modules/database/database.module'
import { HealthModule } from './modules/health/health.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [ConfigModule, DatabaseModule, HealthModule, UserModule],
})
export class AppModule {}
