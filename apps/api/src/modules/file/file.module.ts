import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ReverseShareModule } from 'src/modules/reverse-share/reverse-share.module'
import { ShareModule } from 'src/modules/share/share.module'
import { FileController } from './file.controller'
import { FileService } from './file.service'
import { PrismaService } from 'src/common/services/prisma.service'

@Module({
  imports: [JwtModule.register({}), ReverseShareModule, ShareModule],
  controllers: [FileController],
  providers: [FileService, PrismaService],
  exports: [FileService],
})
export class FileModule {}
