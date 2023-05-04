import { Module } from '@nestjs/common'
import { FileModule } from 'src/modules/file/file.module'
import { ReverseShareModule } from 'src/modules/reverse-share/reverse-share.module'
import { JobsService } from './jobs.service'
import { PrismaService } from 'src/common/services/prisma.service'

@Module({
  imports: [FileModule, ReverseShareModule],
  providers: [JobsService, PrismaService],
})
export class JobsModule {}
