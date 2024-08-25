import { Module } from '@nestjs/common'

import { PagarmeService } from '@/common/services/pagarme.service'

import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PagarmeService],
  exports: [OrdersService],
})
export class OrdersModule {}
