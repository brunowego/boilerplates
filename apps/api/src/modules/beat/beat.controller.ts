import { Controller, Get } from '@nestjs/common'
import { BeatService } from './beat.service'

/**
 * Controller for the healthbeat endpoint
 *
 * @export BeatController
 */
@Controller('_healthbeat')
export class BeatController {
  constructor(private readonly beatService: BeatService) {}

  /**
   * Returns the healthbeat string
   *
   * @returns {string} The healthbeat string
   */
  @Get()
  getBeat(): string {
    return this.beatService.getBeat()
  }
}
