import { Controller, Post, Body } from '@nestjs/common'
import type {
  CreateOrderRequest,
  GetOrderResponse,
} from '@pagarme/pagarme-nodejs-sdk'

import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() createOrderRequest: CreateOrderRequest,
  ): Promise<GetOrderResponse> {
    return await this.ordersService.create(createOrderRequest)
  }
}
