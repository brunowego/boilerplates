import { Module } from '@nestjs/common'
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module'

@Module({
  imports: [HealthcheckModule],
})
export class AppModule {}
