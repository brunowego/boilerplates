import { Controller, Get } from '@nestjs/common'
import {
  TypeOrmHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus'

@Controller('health-check')
export class HealthController {
  constructor(
    private db: TypeOrmHealthIndicator,
    private health: HealthCheckService,
    private http: HttpHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.http.pingCheck('app', 'https://google.com'),
    ])
  }
}
