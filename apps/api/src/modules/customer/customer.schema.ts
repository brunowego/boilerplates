import type { HydratedDocument } from 'mongoose'
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { IsEmail, Length, IsInt, Min, Max } from 'class-validator'

export type CustomerDocument = HydratedDocument<Customer>

@Schema({ timestamps: true })
export class Customer {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  @IsEmail()
  email!: string

  @Prop({
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  })
  @Length(2, 100)
  fullName!: string

  @Prop({
    required: true,
    min: 0,
    max: 120,
  })
  @IsInt()
  @Min(0)
  @Max(120)
  age!: number
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)

CustomerSchema.index({ email: 1 }, { unique: true })
