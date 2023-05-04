import { forwardRef, Module } from '@nestjs/common'
import { FileModule } from 'src/modules/file/file.module'
import { ReverseShareController } from './reverse-share.controller'
import { ReverseShareService } from './reverse-share.service'
import { PrismaService } from 'src/common/services/prisma.service'

@Module({
  imports: [forwardRef(() => FileModule)],
  controllers: [ReverseShareController],
  providers: [ReverseShareService, PrismaService],
  exports: [ReverseShareService],
})
export class ReverseShareModule {}
