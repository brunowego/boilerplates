import {
  Client,
  BalanceOperationsController,
  CustomersController,
  OrdersController,
  RecipientsController,
} from '@pagarme/pagarme-nodejs-sdk'

const client = new Client({
  basicAuthCredentials: {
    username: process.env.PAGARME_API_KEY as string,
    password: '',
  },
})

export {
  client,
  BalanceOperationsController,
  CustomersController,
  OrdersController,
  RecipientsController,
}
