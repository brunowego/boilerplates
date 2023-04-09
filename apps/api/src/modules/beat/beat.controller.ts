import { Public } from '@/common/decorators/public.decorator'
import { Controller, Get } from '@nestjs/common'
import { BeatService } from './beat.service'

@Controller('_healthbeat')
export class BeatController {
  constructor(private readonly beatService: BeatService) {}

  @Public()
  @Get()
  getBeat(): string {
    return this.beatService.getBeat()
  }
}
