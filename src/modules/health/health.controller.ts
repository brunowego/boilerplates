import { Controller, Get } from '@nestjs/common'
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus'
import { PrismaHealthIndicator } from './indicators/prisma-health-indicator'

@Controller('_healthcheck')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prisma: PrismaHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('google', 'https://google.com'),
      () => this.prisma.isHealthy('database'),
    ])
  }
}