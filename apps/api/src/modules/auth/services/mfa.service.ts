import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common'

import { User, MfaMethod } from '@acme/db'
import * as argon from 'argon2'
import { authenticator, totp } from 'otplib'
import qrcode from 'qrcode-svg'
import { PrismaService } from 'src/common/services/prisma.service'
import { AuthService } from './auth.service'
import { SettingService } from 'src/modules/setting/setting.service'
import { SmsService } from './sms.service'
import { AuthSigninMfaDto } from '../dtos'

@Injectable()
export class MfaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly settingService: SettingService,
    private readonly smsService: SmsService
  ) {}

  async signInMfa(dto: AuthSigninMfaDto) {
    if (!dto.email && !dto.username) throw new BadRequestException('Email or username is required')

    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    })

    if (!user || !(await argon.verify(user.password, dto.password)))
      throw new UnauthorizedException('Wrong email or password')

    const token = await this.prismaService.loginToken.findFirst({
      where: {
        token: dto.loginToken,
      },
    })

    if (!token || token.userId != user.id || token.used)
      throw new UnauthorizedException('Invalid login token')

    if (token.expiresAt < new Date())
      throw new UnauthorizedException('Login token expired', 'token_expired')

    const { mfaSecret } = await this.prismaService.user.findUnique({
      where: { id: user.id },
      select: { mfaSecret: true },
    })

    if (!mfaSecret) {
      throw new BadRequestException('MFA is not enabled')
    }

    if (user.mfaMethod === MfaMethod.TOTP) {
      const expected = authenticator.generate(mfaSecret)

      if (dto.code !== expected) {
        throw new BadRequestException('Invalid code')
      }
    }

    if (user.mfaMethod === MfaMethod.SMS) {
      if (dto.code !== mfaSecret) {
        throw new BadRequestException('Invalid code')
      }

      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          mfaSecret: null,
        },
      })
    }

    await this.prismaService.loginToken.update({
      where: { token: token.token },
      data: { used: true },
    })

    const { refreshToken, refreshTokenId } = await this.authService.createRefreshToken(user.id)
    const accessToken = await this.authService.createAccessToken(user, refreshTokenId)

    return { accessToken, refreshToken }
  }

  async enableMfa(user: User, mfaMethod: MfaMethod, password: string, mfaPhone: string) {
    if (!(await argon.verify(user.password, password)))
      throw new ForbiddenException('Invalid password')

    const { mfaVerified } = await this.prismaService.user.findUnique({
      where: { id: user.id },
      select: { mfaVerified: true },
    })

    if (mfaVerified) {
      throw new BadRequestException('MFA is already enabled')
    }

    if (mfaMethod === MfaMethod.TOTP) {
      return this.enableMfaTotp(user)
    }

    if (mfaMethod === MfaMethod.SMS) {
      return this.enableMfaSms(user, mfaPhone)
    }
  }

  async enableMfaTotp(user: User) {
    const mfaSecret = authenticator.generateSecret()

    const totpUri = totp.keyuri(
      user.username || user.email,
      this.settingService.get('general.appName'),
      mfaSecret
    )

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        mfaMethod: MfaMethod.TOTP,
        mfaSecret,
      },
    })

    const qrCode = new qrcode({
      content: totpUri,
      container: 'svg-viewbox',
      join: true,
    }).svg()

    return {
      totpUri,
      mfaSecret,
      qrCode: 'data:image/svg+xml;base64,' + Buffer.from(qrCode).toString('base64'),
    }
  }

  async enableMfaSms(user: User, mfaPhone: string) {
    const mfaSecret = Math.floor(Math.random() * 900000 + 100000).toString()

    this.smsService.sendMessage('+' + mfaPhone, `Your verification code is ${mfaSecret}`)

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        mfaMethod: MfaMethod.SMS,
        mfaPhone,
        mfaSecret,
      },
    })
  }

  async verifyMfa(user: User, password: string, code: string) {
    if (!(await argon.verify(user.password, password)))
      throw new ForbiddenException('Invalid password')

    const { mfaSecret } = await this.prismaService.user.findUnique({
      where: { id: user.id },
      select: { mfaSecret: true },
    })

    if (!mfaSecret) {
      throw new BadRequestException('MFA is not in progress')
    }

    if (user.mfaMethod === MfaMethod.TOTP) {
      const expected = authenticator.generate(mfaSecret)

      if (code !== expected) {
        throw new BadRequestException('Invalid code')
      }
    }

    if (user.mfaMethod === MfaMethod.SMS) {
      if (code !== mfaSecret) {
        throw new BadRequestException('Invalid code')
      }
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        mfaSecret: user.mfaMethod !== MfaMethod.TOTP ? null : mfaSecret,
        mfaVerified: true,
      },
    })

    return true
  }

  async disableMfa(user: User, password: string, code: string) {
    if (!(await argon.verify(user.password, password)))
      throw new ForbiddenException('Invalid password')

    const { mfaSecret } = await this.prismaService.user.findUnique({
      where: { id: user.id },
      select: { mfaSecret: true },
    })

    if (!mfaSecret) {
      throw new BadRequestException('MFA is not enabled')
    }

    if (user.mfaMethod === MfaMethod.TOTP) {
      const expected = authenticator.generate(mfaSecret)

      if (code !== expected) {
        throw new BadRequestException('Invalid code')
      }
    }

    if (user.mfaMethod === MfaMethod.SMS) {
      if (code !== mfaSecret) {
        throw new BadRequestException('Invalid code')
      }
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        mfaMethod: MfaMethod.NONE,
        mfaSecret: null,
        mfaVerified: false,
      },
    })

    return true
  }

  async refreshMfaCode(user: User) {
    const mfaSecret = Math.floor(Math.random() * 900000 + 100000).toString()

    this.smsService.sendMessage('+' + user.mfaPhone, `Your verification code is ${mfaSecret}`)

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        mfaSecret,
      },
    })
  }
}
