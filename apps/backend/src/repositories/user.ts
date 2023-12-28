import { dataSource } from '@medusajs/medusa/dist/loaders/database'
import { UserRepository as MedusaUserRepository } from '@medusajs/medusa/dist/repositories/user'

import { User } from '../models/user'

export const UserRepository = dataSource.getRepository(User).extend({
  ...Object.assign(MedusaUserRepository, { target: User }),
})

export default UserRepository
