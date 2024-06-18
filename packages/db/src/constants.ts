export const PAYMENT_METHOD_TYPES = [
  'manual_pix',
  // 'asaas',
  // 'mercado_pago',
  // 'paypal',
  // 'revolut',
  // 'wise',
  // 'bank_transfer',
  'cod', // Cash on delivery
  'store_credit',
] as const

export const PAYMENT_METHOD_IDENTIFIER_TYPES = [
  // PIX
  'phone_number',
  'email',
  'ssn', // CPF
  'ein', // CNPJ
  'random_key',

  // PayPal, Revolut, Wise
  'id',

  // Mercado Pago
  'url',

  // Bank transfer
  'bank_account',
] as const
