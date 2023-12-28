import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { HealthCheckModule } from './health-check.module'

describe('HealthCheck Module', () => {
  let app: INestApplication

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HealthCheckModule],
    }).compile()

    app = module.createNestApplication()

    await app.init()
  })

  afterEach(async () => {
    await Promise.all([app.close()])
  })

  it('should be define', async () => {
    expect(app).toBeDefined()
  })
})
