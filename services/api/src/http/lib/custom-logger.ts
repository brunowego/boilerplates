import { logger } from '@acme/logger'

export function customLogger(message: string, ...args: string[]) {
  logger.info(message, ...args)
}
