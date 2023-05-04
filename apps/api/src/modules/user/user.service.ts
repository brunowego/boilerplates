import { Injectable, BadRequestException } from '@nestjs/common'
import { Prisma } from '@acme/db'
import * as argon from 'argon2'
import * as crypto from 'crypto'
import { EmailService } from 'src/modules/email/email.service'
import { PrismaService } from 'src/common/services/prisma.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'

@Injectable()
export class UserSevice {
  constructor(private prismaService: PrismaService, private emailService: EmailService) {}

  async list() {
    return await this.prismaService.user.findMany()
  }

  async get(id: string) {
    return await this.prismaService.user.findUnique({ where: { id } })
  }

  async create(dto: CreateUserDto) {
    let hash: string

    if (!dto.password) {
      const randomPassword = crypto.randomUUID()

      hash = await argon.hash(randomPassword)

      await this.emailService.sendInviteEmail(dto.email, randomPassword)
    } else {
      hash = await argon.hash(dto.password)
    }

    try {
      return await this.prismaService.user.create({
        data: {
          ...dto,
          password: hash,
        },
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == 'P2002') {
          const duplicatedField: string = e.meta.target[0]

          throw new BadRequestException(`A user with this ${duplicatedField} already exists`)
        }
      }
    }
  }

  async update(id: string, user: UpdateUserDto) {
    try {
      const hash = user.password && (await argon.hash(user.password))

      return await this.prismaService.user.update({
        where: { id },
        data: { ...user, password: hash },
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == 'P2002') {
          const duplicatedField: string = e.meta.target[0]

          throw new BadRequestException(`A user with this ${duplicatedField} already exists`)
        }
      }
    }
  }

  async delete(id: string) {
    return await this.prismaService.user.delete({ where: { id } })
  }
}
