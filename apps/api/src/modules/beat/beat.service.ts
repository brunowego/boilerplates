import { Injectable } from '@nestjs/common'

/**
 * Service for the healthbeat endpoint
 *
 * @export BeatService
 */
@Injectable()
export class BeatService {
  /**
   * Returns the healthbeat string
   *
   * @returns {string} The healthbeat string
   */
  getBeat(): string {
    return '.'
  }
}
