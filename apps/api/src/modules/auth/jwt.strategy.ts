import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@acme/db'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from 'src/common/services/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private prismaService: PrismaService) {
    super({
      jwtFromRequest: JwtStrategy.extractJWT,
      secretOrKey: configService.get<string>('auth.jwtSecret'),
    })
  }

  private static extractJWT(req: Request) {
    if (!req.cookies.access_token) return null

    return req.cookies.access_token
  }

  async validate(payload: { sub: string }) {
    const user: User = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
    })

    return user
  }
}
