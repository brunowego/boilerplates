import { Schema, type InferSchemaType, model } from 'mongoose'

import { BaseSchema, newId } from '@/db/lib/utils'
import { type IProduct } from '@/db/types'

const productSchema = new Schema<IProduct>(
  {
    id: {
      type: String,
      required: false,
      default: newId(),
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
).add(BaseSchema)

export type Product = InferSchemaType<typeof productSchema>

export const Product = model<IProduct>('Product', productSchema)
