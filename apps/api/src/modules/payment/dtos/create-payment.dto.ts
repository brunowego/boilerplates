import { IsString, IsNumber, IsBoolean } from 'class-validator'
import { PaymentMethodDto } from './payment-method.dto'
import { PaymentSourceDto } from './payment-source.dto'

export class CreatePaymentDto {
  @IsString()
  merchantId: string

  @IsNumber()
  amount: number

  @IsString()
  currency: string

  @IsString()
  statementDescriptor: string

  @IsBoolean()
  capture: boolean

  paymentMethod: PaymentMethodDto

  paymentSource: PaymentSourceDto
}
