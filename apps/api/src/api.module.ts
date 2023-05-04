import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import apiConfig from './common/configs/api.config'
import { apiConfigValidationSchema as validationSchema } from './common/validations/api-config.validation'
import { ScheduleModule } from '@nestjs/schedule'
import { SettingModule } from './modules/setting/setting.module'
import { AuthModule } from './modules/auth/auth.module'
import { EmailModule } from './modules/email/email.module'
import { FileModule } from './modules/file/file.module'
import { JobsModule } from './modules/jobs/jobs.module'
import { UserModule } from './modules/user/user.module'
import { ShareModule } from './modules/share/share.module'
import { ReverseShareModule } from './modules/reverse-share/reverse-share.module'
import { ClamScanModule } from './modules/clamscan/clamscan.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
      validationSchema,
    }),
    ScheduleModule.forRoot(),
    SettingModule,
    AuthModule,
    EmailModule,
    FileModule,
    JobsModule,
    UserModule,
    ShareModule,
    ReverseShareModule,
    ClamScanModule,
  ],
})
export class ApiModule {}
