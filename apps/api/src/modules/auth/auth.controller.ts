import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'

import { User } from '@acme/db'
import { Request, Response } from 'express'
import { SettingService } from 'src/modules/setting/setting.service'
import { AuthService } from './services/auth.service'
import { MfaService } from './services/mfa.service'
import { GetUser } from './get-user.decorator'

import {
  AuthRegisterDto,
  AuthSigninDto,
  AuthSigninMfaDto,
  AuthEnableMfaDto,
  AuthResetPasswordDto,
  AuthTokenDto,
  AuthUpdatePasswordDto,
  AuthVerifyMfaDto,
} from './dtos'

import { JwtGuard } from './guards/jwt.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mfaService: MfaService,
    private settingService: SettingService
  ) {}

  @Post('signup')
  async signUp(@Body() dto: AuthRegisterDto, @Res({ passthrough: true }) response: Response) {
    if (!this.settingService.get('share.allowRegistration'))
      throw new ForbiddenException('Registration is not allowed')

    const result = await this.authService.signUp(dto)

    response = this.addTokensToResponse(response, result.refreshToken, result.accessToken)

    return result
  }

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() dto: AuthSigninDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.signIn(dto)

    if (result.accessToken && result.refreshToken) {
      response = this.addTokensToResponse(response, result.refreshToken, result.accessToken)
    }

    return result
  }

  @Post('signin/mfa')
  @HttpCode(200)
  async signInMfa(@Body() dto: AuthSigninMfaDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.mfaService.signInMfa(dto)

    response = this.addTokensToResponse(response, result.refreshToken, result.accessToken)

    return new AuthTokenDto().from(result)
  }

  @Post('reset-password/:email')
  @HttpCode(204)
  async requestResetPassword(@Param('email') email: string) {
    return await this.authService.requestResetPassword(email)
  }

  @Post('reset-password')
  @HttpCode(204)
  async resetPassword(@Body() dto: AuthResetPasswordDto) {
    return await this.authService.resetPassword(dto.token, dto.password)
  }

  @Patch('password')
  @UseGuards(JwtGuard)
  async updatePassword(
    @GetUser() user: User,
    @Res({ passthrough: true }) response: Response,
    @Body() dto: AuthUpdatePasswordDto
  ) {
    const result = await this.authService.updatePassword(user, dto.oldPassword, dto.password)

    response = this.addTokensToResponse(response, result.refreshToken)

    return new AuthTokenDto().from(result)
  }

  @Post('token')
  @HttpCode(200)
  async refreshAccessToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    if (!request.cookies.refresh_token) throw new UnauthorizedException()

    const accessToken = await this.authService.refreshAccessToken(request.cookies.refresh_token)

    response = this.addTokensToResponse(response, undefined, accessToken)

    return new AuthTokenDto().from({ accessToken })
  }

  @Post('signout')
  async signOut(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    await this.authService.signOut(request.cookies.access_token)

    response.cookie('access_token', 'accessToken', { maxAge: -1 })

    response.cookie('refresh_token', '', {
      path: '/api/auth/token',
      httpOnly: true,
      maxAge: -1,
    })
  }

  @Post('mfa/enable')
  @UseGuards(JwtGuard)
  async enableMfa(@GetUser() user: User, @Body() body: AuthEnableMfaDto) {
    return this.mfaService.enableMfa(user, body.mfaMethod, body.password, body.mfaPhone)
  }

  @Post('mfa/verify')
  @UseGuards(JwtGuard)
  async verifyMfa(@GetUser() user: User, @Body() body: AuthVerifyMfaDto) {
    return this.mfaService.verifyMfa(user, body.password, body.code)
  }

  @Post('mfa/refresh-code')
  @UseGuards(JwtGuard)
  async refreshMfaCode(@GetUser() user: User) {
    return this.mfaService.refreshMfaCode(user)
  }

  @Post('mfa/disable')
  @UseGuards(JwtGuard)
  async disableMfa(@GetUser() user: User, @Body() body: AuthVerifyMfaDto) {
    return this.mfaService.disableMfa(user, body.password, body.code)
  }

  private addTokensToResponse(response: Response, refreshToken?: string, accessToken?: string) {
    if (accessToken) response.cookie('access_token', accessToken, { sameSite: 'lax' })

    if (refreshToken)
      response.cookie('refresh_token', refreshToken, {
        path: '/api/auth/token',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 30 * 3,
      })

    return response
  }
}
