import { forwardRef, Module } from '@nestjs/common'
import { FileModule } from 'src/modules/file/file.module'
import { ClamScanService } from './clamscan.service'
import { PrismaService } from 'src/common/services/prisma.service'

@Module({
  imports: [forwardRef(() => FileModule)],
  providers: [ClamScanService, PrismaService],
  exports: [ClamScanService],
})
export class ClamScanModule {}
