import { type Document } from 'mongoose'

// export interface IError {
//   code: number
//   data: any
// }

export interface IBase {
  created_at: Date
  updated_at: Date
}

export interface IProduct extends Document {
  id: string
  name: string
  price: number
}
