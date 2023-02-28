import { Module } from '@nestjs/common'
import { ConfigModule } from './modules/config/config.module'
import { BeatModule } from './modules/beat/beat.module'
import { HealthModule } from './modules/health/health.module'
import { UserModule } from './modules/user/user.module'
import { PostModule } from './modules/post/post.module'

@Module({
  imports: [ConfigModule, BeatModule, HealthModule, UserModule, PostModule],
})
export class AppModule {}
