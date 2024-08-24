import { Injectable } from '@nestjs/common'
import { Client, CustomersController } from '@pagarme/pagarme-nodejs-sdk'

@Injectable()
export class PagarmeService {
  private readonly client: Client

  public readonly customersController: CustomersController

  constructor() {
    this.client = new Client({
      basicAuthCredentials: {
        username: process.env.PAGARME_API_KEY as string,
        password: '',
      },
    })

    this.customersController = new CustomersController(this.client)
  }
}
