import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { DrizzleService } from './drizzle.service'
import drizzleConfig from './drizzle.config'

@Module({
  imports: [ConfigModule.forFeature(drizzleConfig)],
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DrizzleModule {}
