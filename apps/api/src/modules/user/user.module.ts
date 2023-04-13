import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { PrismaService } from '@/common/services/prisma.service'
import { UserService } from './user.service'
import { IsUniqueEmailConstraint } from '@/common/decorators/is-unique-email.decorator'

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService, IsUniqueEmailConstraint],
})
export class UserModule {}
