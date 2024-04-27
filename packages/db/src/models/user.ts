import mongoose, { Schema } from 'mongoose'

type ObjectId = mongoose.Types.ObjectId

export interface IUser {
  _id: ObjectId
  email: string
  firstName: string
  lastName: string
  createdAt: Date
}

const UserSchema = new Schema(
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

export default mongoose.model<IUser>('User', UserSchema)
