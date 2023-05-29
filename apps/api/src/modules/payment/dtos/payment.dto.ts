import { Expose, plainToClass } from 'class-transformer'
import { IsString, IsNumber, IsBoolean, IsDate } from 'class-validator'
import { PaymentMethodDto } from './payment-method.dto'
import { PaymentSourceDto } from './payment-source.dto'

export class PaymentDto {
  @Expose()
  @IsString()
  id: string

  @IsString()
  merchantId: string

  @Expose()
  @IsNumber()
  amount: number

  @Expose()
  @IsNumber()
  originalAmount: number

  @Expose()
  @IsString()
  currency: string

  @Expose()
  @IsString()
  statementDescriptor: string

  @Expose()
  @IsBoolean()
  capture: boolean

  @Expose()
  @IsString()
  status: string

  @Expose()
  paymentMethod: PaymentMethodDto

  @Expose()
  paymentSource: PaymentSourceDto

  @Expose()
  @IsDate()
  createdAt: Date

  from(partial: Partial<PaymentDto>) {
    return plainToClass(PaymentDto, partial, { excludeExtraneousValues: true })
  }
}
