import { Module } from '@nestjs/common'

import { PagarmeService } from '@/common/services/pagarme.service'

import { CustomerController } from './customer.controller'
import { CustomerService } from './customer.service'

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PagarmeService],
  exports: [CustomerService],
})
export class CustomerModule {}
