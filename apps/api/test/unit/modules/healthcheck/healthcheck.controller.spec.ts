import { HealthcheckController } from '@/modules/healthcheck/healthcheck.controller'
import { TestingModule, Test } from '@nestjs/testing'
import { HttpModule } from '@nestjs/axios'
import { TerminusModule, HealthCheckResult } from '@nestjs/terminus'

describe('HealthController', () => {
  let controller: HealthcheckController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, TerminusModule],
      controllers: [HealthcheckController],
    }).compile()

    controller = app.get<HealthcheckController>(HealthcheckController)
  })

  describe('root', () => {
    it('should call http ping check', async () => {
      const healthCheckResult: HealthCheckResult = {
        status: 'ok',
        info: { google: { status: 'up' } },
        error: {},
        details: { google: { status: 'up' } },
      }

      const result = await controller.check()

      expect(result).toEqual(healthCheckResult)
    })
  })
})
