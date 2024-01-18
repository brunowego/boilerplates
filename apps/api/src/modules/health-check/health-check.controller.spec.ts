import { HttpModule } from '@nestjs/axios'
import {
  HttpHealthIndicator,
  HealthCheckService as TerminusHealthCheckService,
  TerminusModule,
} from '@nestjs/terminus'
import { Test, type TestingModule } from '@nestjs/testing'

import { HealthCheckController } from './health-check.controller'
import { HealthCheckService } from './health-check.service'

describe('HealthCheck Controller', () => {
  let controller: HealthCheckController
  let mockHttp: Partial<HttpHealthIndicator>

  beforeEach(async () => {
    mockHttp = {
      pingCheck: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, TerminusModule],
      controllers: [HealthCheckController],
      providers: [
        HealthCheckService,
        {
          provide: TerminusHealthCheckService,
          useValue: {
            check: jest.fn(async (arrayOfCallback) => {
              const checks: Record<string, string>[] = await Promise.all(
                arrayOfCallback.map((callback: () => any) => callback()),
              )

              const healthResult = checks.reduce(
                (acc, result) => {
                  return {
                    ...acc,
                    info: { ...acc.info, ...result },
                    details: { ...acc.details, ...result },
                  }
                },
                {
                  status: 'ok',
                  info: {
                    storage: { status: 'up' },
                    // memory_heap: { status: 'up' },
                    // memory_rss: { status: 'up' },
                  },
                  error: {},
                  details: {
                    storage: { status: 'up' },
                    // memory_heap: { status: 'up' },
                    // memory_rss: { status: 'up' },
                  },
                },
              )

              return healthResult
            }),
          },
        },
        {
          provide: HttpHealthIndicator,
          useValue: mockHttp,
        },
      ],
    }).compile()

    controller = module.get<HealthCheckController>(HealthCheckController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('liveness', () => {
    it('should return status "OK"', () => {
      expect(controller.livenessCheck()).toHaveProperty('status', 'OK')
    })
  })

  describe('readiness', () => {
    it('should return up services', () => {
      expect(controller.readinessCheck()).resolves.toEqual({
        status: 'ok',
        info: {
          storage: { status: 'up' },
          // memory_heap: { status: 'up' },
          // memory_rss: { status: 'up' },
        },
        error: {},
        details: {
          storage: { status: 'up' },
          // memory_heap: { status: 'up' },
          // memory_rss: { status: 'up' },
        },
      })
    })
  })
})
