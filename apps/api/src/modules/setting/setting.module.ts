import { Global, Module } from '@nestjs/common'
import { EmailModule } from 'src/modules/email/email.module'
import { PrismaService } from 'src/common/services/prisma.service'
import { SettingController } from './setting.controller'
import { SettingService } from './setting.service'
import { LogoService } from './logo.service'

@Global()
@Module({
  imports: [EmailModule],
  providers: [
    {
      provide: 'SETTING_VARIABLES',
      useFactory: async (prismaService: PrismaService) => {
        return await prismaService.setting.findMany()
      },
      inject: [PrismaService],
    },
    SettingService,
    LogoService,
    PrismaService,
  ],
  controllers: [SettingController],
  exports: [SettingService],
})
export class SettingModule {}
