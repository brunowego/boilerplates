import { HealthController } from '@/modules/health/health.controller'
import { TestingModule, Test } from '@nestjs/testing'
import { HttpModule } from '@nestjs/axios'
import { TerminusModule, HealthCheckResult } from '@nestjs/terminus'

describe('HealthController', () => {
  let controller: HealthController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, TerminusModule],
      controllers: [HealthController],
    }).compile()

    controller = app.get<HealthController>(HealthController)
  })

  describe('root', () => {
    it('should call http ping check', async () => {
      const healthResult: HealthCheckResult = {
        status: 'ok',
        info: { app: { status: 'up' } },
        error: {},
        details: { app: { status: 'up' } },
      }

      const result = await controller.check()

      expect(result).toEqual(healthResult)
    })
  })
})
