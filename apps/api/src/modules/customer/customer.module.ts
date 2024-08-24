import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Customer, CustomerSchema } from './customer.schema'
import { CustomerController } from './customer.controller'
import { CustomerService } from './customer.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
