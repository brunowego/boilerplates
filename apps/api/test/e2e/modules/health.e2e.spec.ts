import { INestApplication } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import { ApiModule } from '@/api.module'
import request from 'supertest'

describe('HealthController (e2e)', () => {
  let api: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile()

    api = moduleFixture.createNestApplication()

    await api.init()
  })

  it('/_healthcheck (GET)', () => {
    return request(api.getHttpServer()).get('/_healthcheck').expect(200)
  })
})
