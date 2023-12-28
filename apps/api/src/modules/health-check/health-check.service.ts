import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthCheckService {
  getStatus(): { status: string } {
    return { status: 'OK' }
  }
}
