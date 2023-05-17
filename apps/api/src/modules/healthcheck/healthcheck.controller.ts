import { Controller, Get } from '@nestjs/common'
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus'

@Controller('_healthcheck')
export class HealthcheckController {
  constructor(private healthCheck: HealthCheckService, private http: HttpHealthIndicator) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheck.check([() => this.http.pingCheck('google', 'https://google.com')])
  }
}
