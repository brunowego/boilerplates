import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common'

import { PrismaService } from 'src/common/services/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { EmailService } from 'src/modules/email/email.service'
import { SmsService } from './sms.service'
import { Prisma, MfaMethod, User } from '@acme/db'
import * as argon from 'argon2'
import moment from 'moment'
import { AuthRegisterDto } from '../dtos/auth-register.dto'
import { AuthSigninDto } from '../dtos/auth-signin.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService
  ) {}

  async signUp(dto: AuthRegisterDto) {
    const isFirstUser = (await this.prismaService.user.count()) == 0
    const hash = await argon.hash(dto.password)

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          password: hash,
          isAdmin: isFirstUser,
        },
      })

      const { refreshToken, refreshTokenId } = await this.createRefreshToken(user.id)
      const accessToken = await this.createAccessToken(user, refreshTokenId)

      return { accessToken, refreshToken }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == 'P2002') {
          const duplicatedField: string = e.meta.target[0]

          throw new BadRequestException(`A user with this ${duplicatedField} already exists`)
        }
      }
    }
  }

  async signIn(dto: AuthSigninDto) {
    if (!dto.email && !dto.username) throw new BadRequestException('Email or username is required')

    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    })

    if (!user || !(await argon.verify(user.password, dto.password)))
      throw new UnauthorizedException('Wrong email or password')

    if (user.mfaVerified) {
      const loginToken = await this.createLoginToken(user.id)

      if (user.mfaMethod == MfaMethod.SMS) {
        const mfaSecret = Math.floor(Math.random() * 900000 + 100000).toString()

        await this.prismaService.user.update({
          where: { id: user.id },
          data: {
            mfaSecret,
          },
        })

        this.smsService.sendMessage('+' + user.mfaPhone, `Your verification code is ${mfaSecret}`)
      }

      return { loginToken }
    }

    const { refreshToken, refreshTokenId } = await this.createRefreshToken(user.id)
    const accessToken = await this.createAccessToken(user, refreshTokenId)

    return { accessToken, refreshToken }
  }

  async requestResetPassword(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: { email },
      include: { resetPasswordToken: true },
    })

    if (!user) throw new BadRequestException('User not found')

    if (user.resetPasswordToken) {
      await this.prismaService.resetPasswordToken.delete({
        where: { token: user.resetPasswordToken.token },
      })
    }

    const { token } = await this.prismaService.resetPasswordToken.create({
      data: {
        expiresAt: moment().add(1, 'hour').toDate(),
        user: { connect: { id: user.id } },
      },
    })

    await this.emailService.sendResetPasswordEmail(user.email, token)
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.prismaService.user.findFirst({
      where: { resetPasswordToken: { token } },
    })

    if (!user) throw new BadRequestException('Token invalid or expired')

    const newPasswordHash = await argon.hash(newPassword)

    await this.prismaService.resetPasswordToken.delete({
      where: { token },
    })

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { password: newPasswordHash },
    })
  }

  async updatePassword(user: User, oldPassword: string, newPassword: string) {
    if (!(await argon.verify(user.password, oldPassword)))
      throw new ForbiddenException('Invalid password')

    const hash = await argon.hash(newPassword)

    await this.prismaService.refreshToken.deleteMany({
      where: { userId: user.id },
    })

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { password: hash },
    })

    return this.createRefreshToken(user.id)
  }

  async createAccessToken(user: User, refreshTokenId: string) {
    return this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        refreshTokenId,
      },
      {
        expiresIn: `${this.configService.get<number>('auth.jwtExpiryTime')}s`,
        secret: this.configService.get<string>('auth.jwtSecret'),
      }
    )
  }

  async signOut(accessToken: string) {
    const { refreshTokenId } =
      (this.jwtService.decode(accessToken) as {
        refreshTokenId: string
      }) || {}

    if (refreshTokenId) {
      await this.prismaService.refreshToken.delete({ where: { id: refreshTokenId } }).catch((e) => {
        if (e.code != 'P2025') throw e
      })
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const refreshTokenMetaData = await this.prismaService.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    })

    if (!refreshTokenMetaData || refreshTokenMetaData.expiresAt < new Date())
      throw new UnauthorizedException()

    return this.createAccessToken(refreshTokenMetaData.user, refreshTokenMetaData.id)
  }

  async createRefreshToken(userId: string) {
    const { id, token } = await this.prismaService.refreshToken.create({
      data: { userId, expiresAt: moment().add(3, 'months').toDate() },
    })

    return { refreshTokenId: id, refreshToken: token }
  }

  async createLoginToken(userId: string) {
    const loginToken = (
      await this.prismaService.loginToken.create({
        data: { userId, expiresAt: moment().add(5, 'minutes').toDate() },
      })
    ).token

    return loginToken
  }
}
