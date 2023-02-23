import { Module } from '@nestjs/common'
import { ConfigModule } from './modules/config/config.module'
import { BeatModule } from './modules/beat/beat.module'
import { HealthModule } from './modules/health/health.module'

/**
 * Main module
 *
 * @export AppModule
 */
@Module({
  imports: [ConfigModule, BeatModule, HealthModule],
})
export class AppModule {}
