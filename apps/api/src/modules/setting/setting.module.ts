import { Global, Module } from '@nestjs/common'
import { PrismaService } from '@/common/services/prisma.service'
import { SettingService } from './setting.service'
import { SettingController } from './setting.controller'

@Global()
@Module({
  providers: [
    {
      provide: 'CONFIG_VARIABLES',
      useFactory: async (prisma: PrismaService) => {
        return await prisma.setting.findMany()
      },
      inject: [PrismaService],
    },
    SettingService,
    PrismaService,
  ],
  controllers: [SettingController],
  exports: [SettingService],
})
export class SettingModule {}
