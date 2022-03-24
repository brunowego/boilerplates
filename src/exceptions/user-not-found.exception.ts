import { HttpException, HttpStatus } from '@nestjs/common'

export class UserNotFoundException extends HttpException {
  constructor() {
    super(
      {
        error: 108,
        status: HttpStatus.NOT_FOUND,
        message: 'User not found.',
      },
      HttpStatus.NOT_FOUND
    )
  }
}
