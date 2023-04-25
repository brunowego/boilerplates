import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TerminusModule } from '@nestjs/terminus'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [HttpModule, TerminusModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
