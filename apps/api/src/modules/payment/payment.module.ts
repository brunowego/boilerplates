import { Module } from '@nestjs/common'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { PrismaService } from '@/common/services/prisma.service'

@Module({
  providers: [PaymentService, PrismaService],
  controllers: [PaymentController],
})
export class PaymentModule {}
