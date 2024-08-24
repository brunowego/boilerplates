import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import type {
  CreateCustomerRequest,
  ListCustomersResponse,
  GetCustomerResponse,
} from '@pagarme/pagarme-nodejs-sdk'

import { CustomerService } from './customer.service'

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async listCustomers(): Promise<ListCustomersResponse> {
    return await this.customerService.list()
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: string): Promise<GetCustomerResponse> {
    return await this.customerService.findById(id)
  }

  @Post()
  async createCustomer(
    @Body() createCustomerRequest: CreateCustomerRequest,
  ): Promise<GetCustomerResponse> {
    return await this.customerService.create(createCustomerRequest)
  }
}
