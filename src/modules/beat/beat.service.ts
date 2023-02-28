import { Injectable } from '@nestjs/common'

@Injectable()
export class BeatService {
  getBeat(): string {
    return '.'
  }
}
