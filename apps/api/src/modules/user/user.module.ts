import { Module } from '@nestjs/common'
import { EmailModule } from 'src/modules/email/email.module'
import { UserController } from './user.controller'
import { UserSevice } from './user.service'
import { PrismaService } from 'src/common/services/prisma.service'

@Module({
  imports: [EmailModule],
  providers: [UserSevice, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
