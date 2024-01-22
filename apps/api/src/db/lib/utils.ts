import { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

import { type IBase } from '@/db/types'

export const newId = () => uuidv4()

export const BaseSchema = new Schema<IBase>({
  created_at: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updated_at: {
    type: Date,
    default: () => Date.now(),
  },
})
