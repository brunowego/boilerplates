import { registerAs } from '@nestjs/config'

// export default registerAs('sms', () => ({}))

export default registerAs('twilio', () => ({
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  senderPhoneNumber: process.env.TWILIO_SENDER_PHONE_NUMBER,
}))
