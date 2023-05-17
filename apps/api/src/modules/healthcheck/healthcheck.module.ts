import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TerminusModule } from '@nestjs/terminus'
import { HealthcheckController } from './healthcheck.controller'

@Module({
  imports: [HttpModule, TerminusModule],
  controllers: [HealthcheckController],
})
export class HealthcheckModule {}
