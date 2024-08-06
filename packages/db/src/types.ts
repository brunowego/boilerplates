import type { Types } from 'mongoose'

export interface IUser {
  _id: Types.ObjectId
  email: string
  firstName: string
  lastName: string
  createdAt: Date
}
