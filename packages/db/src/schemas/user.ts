import mongoose from 'mongoose'

import type { IUser } from '../types'

const Schema = mongoose.Schema

export const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
  },
  {
    timestamps: true,
  },
)

export const User = mongoose.model('User', UserSchema)
