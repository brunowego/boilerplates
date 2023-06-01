import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TerminusModule } from '@nestjs/terminus'
import { HealthcheckController } from './healthcheck.controller'
import { PrismaService } from '@/common/services/prisma.service'
import { PrismaHealthIndicator } from './indicators/prisma-health-indicator'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [HttpModule, TerminusModule],
  controllers: [HealthcheckController],
  providers: [PrismaService, PrismaHealthIndicator, ConfigService],
})
export class HealthcheckModule {}
