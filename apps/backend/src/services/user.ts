import { Lifetime } from 'awilix'

import { Currency, UserService as MedusaUserService } from '@medusajs/medusa'
import { CreateUserInput as MedusaCreateUserInput } from '@medusajs/medusa/dist/types/user'

import { User } from '../models/user'
import StoreRepository from '../repositories/store'

const DEFAULT_CURRENCY: Currency = {
  code: 'brl',
  symbol: '',
  symbol_native: '',
  name: '',
}

type CreateUserInput = {
  store_id?: string
} & MedusaCreateUserInput

class UserService extends MedusaUserService {
  static LIFE_TIME = Lifetime.SCOPED
  protected readonly storeRepository_: typeof StoreRepository

  constructor(container, _options) {
    // @ts-expect-error prefer-rest-params
    super(...arguments)

    this.storeRepository_ = container.storeRepository
  }

  async create(user: CreateUserInput, password: string): Promise<User> {
    if (!user.store_id) {
      const storeRepo = this.manager_.withRepository(this.storeRepository_)

      let newStore = storeRepo.create()

      newStore.name = user.email
      newStore.currencies = [DEFAULT_CURRENCY]
      newStore.default_currency = DEFAULT_CURRENCY
      newStore = await storeRepo.save(newStore)

      user.store_id = newStore.id
    }

    return await super.create(user, password)
  }
}

export default UserService
