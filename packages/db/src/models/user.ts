import { BaseModel } from './base'
import { User } from '../schemas/user'
import type { IUser } from '../types'

export const userModel = new BaseModel(User)

export const seedUsers = async () => {
  const usersData = [
    {
      email: 'brunowego@gmail.com',
      firstName: 'Bruno',
      lastName: 'Gomes',
    },
  ] as IUser[]

  for (const user of usersData) {
    await User.findOneAndUpdate({ email: user.email }, user, {
      upsert: true,
    })
  }
}
