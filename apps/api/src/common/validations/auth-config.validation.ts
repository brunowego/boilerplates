import * as Joi from 'joi'

export const authConfigValidationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  // JWT_EXPIRY_TIME: Joi.number().required(),

  TWILIO_ACCOUNT_SID: Joi.string().required(),
  TWILIO_AUTH_TOKEN: Joi.string().required(),
  TWILIO_SENDER_PHONE_NUMBER: Joi.string().required(),
})
