import { Module } from '@nestjs/common'

import { PagarmeService } from '@/common/services/pagarme.service'

import { CustomersController } from './customers.controller'
import { CustomersService } from './customers.service'

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, PagarmeService],
  exports: [CustomersService],
})
export class CustomersModule {}
