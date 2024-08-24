import { Injectable, Logger } from '@nestjs/common'
import type {
  CreateCustomerRequest,
  ListCustomersResponse,
  GetCustomerResponse,
} from '@pagarme/pagarme-nodejs-sdk'

import { PagarmeService } from '@/common/services/pagarme.service'

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name)

  constructor(private readonly pagarmeService: PagarmeService) {}

  async list(): Promise<ListCustomersResponse> {
    try {
      return await this.pagarmeService.customersController
        .getCustomers()
        .then((res) => res.result)
    } catch (err) {
      this.logger.error('Error listing customers', err)

      throw new Error('Failed to list customers')
    }
  }

  async findById(id: string): Promise<GetCustomerResponse> {
    try {
      return await this.pagarmeService.customersController
        .getCustomer(id)
        .then((res) => res.result)
    } catch (err) {
      this.logger.error('Error finding customer', err)

      throw new Error('Failed to find customer')
    }
  }

  async create(data: CreateCustomerRequest): Promise<GetCustomerResponse> {
    try {
      return await this.pagarmeService.customersController
        .createCustomer({
          ...data,
          metadata: {},
        })
        .then((res) => res.result)
    } catch (err) {
      this.logger.error('Error creating customer', err)

      throw new Error('Failed to create customer')
    }
  }
}
