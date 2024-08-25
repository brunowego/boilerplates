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
        .createOrder({
          items: [
            {
              amount: 5990,
              description: 'Chaveiro do Tesseract',
              quantity: 1,
              category: '01J63HZ4Q071PES7D0EKC7YHH1',
              code: '01J63HFATKP7N5DPM6TSW7K3P9',
            },
          ],
          customer: {
            code: '01J6303XCB4DV0QHNT6GSE0N43',
            name: 'Pedro Álvares Cabral',
            email: 'pedro@brasil.com.br',
            document: '71861511833',
            type: 'individual',
            address: {
              street: 'Monte Pascoal',
              number: '1500',
              zipCode: '45848000',
              neighborhood: 'Monte Pascoal',
              city: 'Monte Pascoal',
              state: 'Bahia',
              country: 'BR',
              complement: '',
              line1: '',
              line2: '',
            },
            metadata: {},
            phones: {
              homePhone: {
                countryCode: '55',
                number: '982134999',
                areaCode: '71',
              },
              mobilePhone: {
                countryCode: '55',
                number: '982134999',
                areaCode: '71',
              },
            },
          },
          payments: [
            {
              paymentMethod: 'credit_card',
              creditCard: {
                recurrence: false,
                installments: 1,
                statementDescriptor: 'AVENGERS',
                card: {
                  number: '4000000000000010',
                  holderName: 'Pedro Álvares Cabral',
                  expMonth: 1,
                  expYear: 25,
                  cvv: '3531',
                  billingAddress: {
                    street: 'Monte Pascoal',
                    number: '1500',
                    zipCode: '45848000',
                    neighborhood: 'Monte Pascoal',
                    city: 'Monte Pascoal',
                    state: 'Bahia',
                    country: 'BR',
                    complement: '',
                    line1: '',
                    line2: '',
                  },
                },
              },
              split: [
                {
                  type: 'percentage',
                  amount: 70,
                  recipientId: 're_clzvmcgob03bg0k9tpg9jqlhi',
                  options: {
                    liable: true,
                    chargeProcessingFee: true,
                    chargeRemainderFee: true,
                  },
                },
                {
                  type: 'percentage',
                  amount: 30,
                  recipientId: 're_cm08vrj7509ue0l9tsk8anj3t',
                  options: {
                    liable: false,
                    chargeProcessingFee: false,
                    chargeRemainderFee: false,
                  },
                },
              ],
            },
          ],
          code: '01J63J8EPXHCCW5GJRQ6GQVV84',
          closed: false,
        })
        .then((res) => res.result)
    } catch (err) {
      this.logger.error('Error creating customer', err)

      throw new Error('Failed to create customer')
    }
  }
}
