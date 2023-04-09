import * as Joi from 'joi'

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development')
    .required(),
  TZ: Joi.string().default('UTC').required(),
  HOST: Joi.string().default('0.0.0.0'),
  PORT: Joi.number().default(3000),
})
