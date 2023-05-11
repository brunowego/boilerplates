import * as Joi from 'joi'

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development')
    .required(),
  TZ: Joi.string().required(),

  SENTRY_DSN: Joi.string().required(),
})
