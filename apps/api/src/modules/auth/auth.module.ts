import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import authConfig from 'src/common/configs/auth.config'
import smsConfig from 'src/common/configs/sms.config'
import { authConfigValidationSchema as validationSchema } from 'src/common/validations/auth-config.validation'
import { JwtModule } from '@nestjs/jwt'
import { EmailModule } from 'src/modules/email/email.module'
import { AuthController } from './auth.controller'
import { AuthService } from './services/auth.service'
import { MfaService } from './services/mfa.service'
import { JwtStrategy } from './jwt.strategy'
import { PrismaService } from 'src/common/services/prisma.service'
import SmsService from './services/sms.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig, smsConfig],
      validationSchema,
    }),
    JwtModule.register({}),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, MfaService, JwtStrategy, PrismaService, SmsService],
  exports: [AuthService],
})
export class AuthModule {}
