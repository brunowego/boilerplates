import { INestApplication } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import { AppModule } from '@/app.module'
import request from 'supertest'

describe('HealthController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  it('/_healthcheck (GET)', () => {
    return request(app.getHttpServer()).get('/_healthcheck').expect(200)
  })
})
