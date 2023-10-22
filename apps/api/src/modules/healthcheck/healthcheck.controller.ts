import { Controller, Get } from '@nestjs/common'
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus'

@Controller('_healthcheck')
export class HealthcheckController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.http.pingCheck('app', 'https://google.com')])
  }
}
