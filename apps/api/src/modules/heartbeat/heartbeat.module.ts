import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TerminusModule } from '@nestjs/terminus'
import { HeartbeatController } from './heartbeat.controller'
import { HeartbeatService } from './heartbeat.service'

@Module({
  imports: [HttpModule, TerminusModule],
  controllers: [HeartbeatController],
  providers: [HeartbeatService],
})
export class HeartbeatModule {}
