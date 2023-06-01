import { Injectable } from '@nestjs/common'

@Injectable()
export class HeartbeatService {
  showHeartbeat(): string {
    return '.'
  }
}
