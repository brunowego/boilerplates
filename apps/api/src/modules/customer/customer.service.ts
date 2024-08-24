import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'

import { Customer, type CustomerDocument } from './customer.schema'

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async findById(id: string): Promise<CustomerDocument> {
    const customer = await this.customerModel.findById(id).lean().exec()

    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`)
    }

    return customer
  }
}
