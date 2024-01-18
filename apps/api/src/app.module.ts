import { Module } from '@nestjs/common'

import { HealthCheckModule } from './modules/health-check/health-check.module'
import { SseModule } from './modules/sse/sse.module'

@Module({
  imports: [HealthCheckModule, SseModule],
})
export class AppModule {}
