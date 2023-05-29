import { Controller, Get } from '@nestjs/common'
import { ApiSecurity } from '@nestjs/swagger'
import { HeartbeatService } from './heartbeat.service'
import { Public } from '@/common/decorators/public.decorator'

@Controller('_heartbeat')
@ApiSecurity('X-API-KEY')
export class HeartbeatController {
  constructor(private readonly heartbeatService: HeartbeatService) {}

  @Public()
  @Get()
  showHeartbeat(): string {
    return this.heartbeatService.showHeartbeat()
  }
}
