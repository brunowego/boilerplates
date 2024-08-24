import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TerminusModule } from '@nestjs/terminus'

import { HealthCheckController } from './health-check.controller'
import { HealthCheckService } from './health-check.service'

@Module({
  imports: [HttpModule, TerminusModule],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
