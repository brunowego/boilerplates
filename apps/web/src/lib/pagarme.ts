import {
  Client,
  BalanceOperationsController,
  CustomersController,
  InvoicesController,
  OrdersController,
  PayablesController,
  PlansController,
  RecipientsController,
  SubscriptionsController,
  TransactionsController,
  TransfersController,
  type CreateRegisterInformationIndividualRequest,
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
  InvoicesController,
  OrdersController,
  PayablesController,
  PlansController,
  RecipientsController,
  SubscriptionsController,
  TransactionsController,
  TransfersController,
  type CreateRegisterInformationIndividualRequest,
}
