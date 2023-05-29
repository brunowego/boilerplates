import { PaymentType } from '@acme/db'
import { IsNumber, IsString } from 'class-validator'

export class PaymentMethodDto {
  paymentType: PaymentType

  @IsNumber()
  expiresIn: number

  // @IsString()
  // qrCodeData: string

  // @IsString()
  // qrCodeImageUrl: string
}
