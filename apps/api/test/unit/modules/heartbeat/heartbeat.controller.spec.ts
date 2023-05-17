import { Test, TestingModule } from '@nestjs/testing'
import { HeartbeatController } from '@/modules/heartbeat/heartbeat.controller'
import { HeartbeatService } from '@/modules/heartbeat/heartbeat.service'

describe('BeatController', () => {
  let controller: HeartbeatController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HeartbeatController],
      providers: [HeartbeatService],
    }).compile()

    controller = app.get<HeartbeatController>(HeartbeatController)
  })

  describe('root', () => {
    it('should return "."', () => {
      expect(controller.showHeartbeat()).toBe('.')
    })
  })
})
