import { Test, TestingModule } from '@nestjs/testing'
import { BeatController } from '@/modules/beat/beat.controller'
import { BeatService } from '@/modules/beat/beat.service'

describe('BeatController', () => {
  let controller: BeatController

  beforeEach(async () => {
    const api: TestingModule = await Test.createTestingModule({
      controllers: [BeatController],
      providers: [BeatService],
    }).compile()

    controller = api.get<BeatController>(BeatController)
  })

  describe('root', () => {
    it('should return "."', () => {
      expect(controller.getBeat()).toBe('.')
    })
  })
})
