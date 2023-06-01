import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TerminusModule } from '@nestjs/terminus'
import { HealthzController } from './healthz.controller'

@Module({
  imports: [HttpModule, TerminusModule],
  controllers: [HealthzController],
})
export class HealthzModule {}
