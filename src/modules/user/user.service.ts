import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/common/services/prisma.service'
import { Prisma, User } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    })
  }
}
