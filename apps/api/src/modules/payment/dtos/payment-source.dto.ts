import { SourceType, Customer } from '@acme/db'

export class PaymentSourceDto {
  sourceType: SourceType

  customer: Customer
}
