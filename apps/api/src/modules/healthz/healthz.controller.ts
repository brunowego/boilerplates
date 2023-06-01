import { Controller, Get } from '@nestjs/common'
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus'

@Controller('healthz')
export class HealthzController {
  constructor(private healthCheckService: HealthCheckService, private http: HttpHealthIndicator) {}

  @Get('ready')
  @HealthCheck()
  async readinessCheck() {
    return this.healthCheckService.check([
      () => this.http.pingCheck('google', 'https://google.com'),
    ])
  }

  @Get('live')
  @HealthCheck()
  async livenessCheck(): Promise<{ status: string }> {
    return { status: 'OK' }
  }
}
