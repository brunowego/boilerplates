import { Controller, Get } from '@nestjs/common'
import { ApiSecurity } from '@nestjs/swagger'
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus'

@Controller('_healthcheck')
@ApiSecurity('X-API-KEY')
export class HealthcheckController {
  constructor(private healthCheck: HealthCheckService, private http: HttpHealthIndicator) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheck.check([() => this.http.pingCheck('google', 'https://google.com')])
  }
}
