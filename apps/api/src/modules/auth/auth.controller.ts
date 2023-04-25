import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './signup.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto)
  }
}
