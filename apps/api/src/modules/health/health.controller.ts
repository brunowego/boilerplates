import { Controller, Get } from '@nestjs/common'
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus'

/**
 * Controller for the healthcheck endpoint
 *
 * @export HealthController
 */
@Controller('_healthcheck')
export class HealthController {
  constructor(private health: HealthCheckService, private http: HttpHealthIndicator) {}

  /**
   * Returns the healthcheck result
   *
   * @returns {Promise<HealthCheckResult>}
   */
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.http.pingCheck('app', 'https://google.com')])
  }
}
