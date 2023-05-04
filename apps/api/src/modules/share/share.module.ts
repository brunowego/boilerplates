import { Module, forwardRef } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import authConfig from 'src/common/configs/auth.config'
import { authConfigValidationSchema as validationSchema } from 'src/common/validations/auth-config.validation'
import { JwtModule } from '@nestjs/jwt'
import { ClamScanModule } from 'src/modules/clamscan/clamscan.module'
import { EmailModule } from 'src/modules/email/email.module'
import { FileModule } from 'src/modules/file/file.module'
import { ReverseShareModule } from 'src/modules/reverse-share/reverse-share.module'
import { ShareController } from './share.controller'
import { ShareService } from './share.service'
import { PrismaService } from 'src/common/services/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig],
      validationSchema,
    }),
    JwtModule.register({}),
    EmailModule,
    ClamScanModule,
    ReverseShareModule,
    forwardRef(() => FileModule),
  ],
  controllers: [ShareController],
  providers: [ShareService, PrismaService],
  exports: [ShareService],
})
export class ShareModule {}
