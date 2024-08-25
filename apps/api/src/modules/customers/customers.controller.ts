import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import type {
  CreateCustomerRequest,
  ListCustomersResponse,
  GetCustomerResponse,
} from '@pagarme/pagarme-nodejs-sdk'

import { CustomersService } from './customers.service'

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async listCustomers(): Promise<ListCustomersResponse> {
    return await this.customersService.list()
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: string): Promise<GetCustomerResponse> {
    return await this.customersService.findById(id)
  }

  @Post()
  async createCustomer(
    @Body() createCustomerRequest: CreateCustomerRequest,
  ): Promise<GetCustomerResponse> {
    return await this.customersService.create(createCustomerRequest)
  }
}
