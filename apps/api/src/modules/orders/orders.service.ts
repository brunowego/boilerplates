import { Injectable, Logger } from '@nestjs/common'
import type {
  CreateOrderRequest,
  GetOrderResponse,
} from '@pagarme/pagarme-nodejs-sdk'

import { PagarmeService } from '@/common/services/pagarme.service'

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name)

  constructor(private readonly pagarmeService: PagarmeService) {}

  async create(data: CreateOrderRequest): Promise<GetOrderResponse> {
    try {
      return await this.pagarmeService.ordersController
        .createOrder(data)
        .then((res) => res.result)
    } catch (err) {
      this.logger.error('Error creating customer', err)

      throw new Error('Failed to create customer')
    }
  }
}
