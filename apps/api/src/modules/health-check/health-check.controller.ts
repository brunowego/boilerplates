import { Controller, Get } from '@nestjs/common'
import {
  type HealthCheckService as TerminusHealthCheckService,
  type HttpHealthIndicator,
  type DiskHealthIndicator, // MemoryHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus'

import type { HealthCheckService } from './health-check.service'

@Controller()
export class HealthCheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private health: TerminusHealthCheckService,
    private http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    // private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get('livez')
  @HealthCheck()
  livenessCheck(): { status: string } {
    return this.healthCheckService.getStatus()
  }

  @Get('readyz')
  @HealthCheck()
  async readinessCheck() {
    return this.health.check([
      () => this.http.pingCheck('livez', 'http://localhost:3000/livez'),
      async () =>
        this.disk.checkStorage('storage', { thresholdPercent: 0.8, path: '/' }),
      // async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150MB
      // async () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024), // 150MB
    ])
  }
}
