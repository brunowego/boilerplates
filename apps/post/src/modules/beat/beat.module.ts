import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TerminusModule } from '@nestjs/terminus'
import { BeatController } from './beat.controller'
import { BeatService } from './beat.service'

@Module({
  imports: [HttpModule, TerminusModule],
  controllers: [BeatController],
  providers: [BeatService],
})
export class BeatModule {}
