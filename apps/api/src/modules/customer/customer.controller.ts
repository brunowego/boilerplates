import { Controller, Get, Param } from '@nestjs/common'
import { TransformPlainToInstance } from 'class-transformer'

import { CustomerService } from './customer.service'
import { CustomerResponseDto } from './customer-response.dto'

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get(':id')
  @TransformPlainToInstance(CustomerResponseDto)
  async getCustomerById(@Param('id') id: string): Promise<CustomerResponseDto> {
    return await this.customerService.findById(id)
  }
}
