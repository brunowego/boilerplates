import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from './health.controller'
import { PrismaService } from '@/common/services/prisma.service'
import { PrismaHealthIndicator } from './indicators/prisma-health-indicator'

@Module({
  imports: [HttpModule, TerminusModule],
  controllers: [HealthController],
  providers: [PrismaService, PrismaHealthIndicator],
})
export class HealthModule {}
