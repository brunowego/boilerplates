import { Controller, Get } from '@nestjs/common'
import { HealthCheckService, HealthCheck } from '@nestjs/terminus'
import { PrismaHealthIndicator } from './indicators/prisma-health-indicator'

@Controller('_healthcheck')
export class HealthcheckController {
  constructor(
    private healthCheckService: HealthCheckService,
    private prismaHealthIndicator: PrismaHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([() => this.prismaHealthIndicator.isHealthy('database')])
  }
}
