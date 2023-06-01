import { Injectable } from '@nestjs/common'
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus'
import { PrismaService } from '@/common/services/prisma.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {
    super()
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      if (!this.configService.get('app.isTest')) {
        await this.prismaService.$queryRaw`SELECT 1`
      }

      return this.getStatus(key, true)
    } catch (e) {
      throw new HealthCheckError('Prisma check failed', e)
    }
  }
}
