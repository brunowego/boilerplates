import { Test, TestingModule } from '@nestjs/testing'
import { BeatController } from '@/modules/beat/beat.controller'
import { BeatService } from '@/modules/beat/beat.service'

describe('BeatController', () => {
  let controller: BeatController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BeatController],
      providers: [BeatService],
    }).compile()

    controller = app.get<BeatController>(BeatController)
  })

  describe('root', () => {
    it('should return "."', () => {
      expect(controller.getBeat()).toBe('.')
    })
  })
})
