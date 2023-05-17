import { Controller, Get } from '@nestjs/common'
import { HeartbeatService } from './heartbeat.service'

@Controller('_heartbeat')
export class HeartbeatController {
  constructor(private readonly heartbeatService: HeartbeatService) {}

  @Get()
  showHeartbeat(): string {
    return this.heartbeatService.showHeartbeat()
  }
}
