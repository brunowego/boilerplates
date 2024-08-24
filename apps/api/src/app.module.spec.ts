import type { INestApplication } from '@nestjs/common'
import { Test, type TestingModule } from '@nestjs/testing'

import { AppModule } from './app.module'

describe('App Module', () => {
  let app: INestApplication

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
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
