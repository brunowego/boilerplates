import { Injectable /*, BadRequestException */ } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Twilio } from 'twilio'
// import { UserSevice } from 'src/modules/user/user.service'

@Injectable()
export class SmsService {
  private twilioClient: Twilio

  constructor(
    private readonly configService: ConfigService //, private readonly userSevice: UserSevice
  ) {
    this.twilioClient = new Twilio(
      configService.get('twilio.accountSid'),
      configService.get('twilio.authToken')
    )
  }

  // initiatePhoneNumberVerification(phoneNumber: string) {
  //   const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID')

  //   return this.twilioClient.verify._v2
  //     .services(serviceSid)
  //     .verifications.create({ to: phoneNumber, channel: 'sms' })
  // }

  // async confirmPhoneNumber(userId: number, phoneNumber: string, verificationCode: string) {
  //   const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID')

  //   const result = await this.twilioClient.verify._v2
  //     .services(serviceSid)
  //     .verificationChecks.create({ to: phoneNumber, code: verificationCode })

  //   if (!result.valid || result.status !== 'approved') {
  //     throw new BadRequestException('Wrong code provided')
  //   }

  //   await this.userSevice.markPhoneNumberAsConfirmed(userId)
  // }

  async sendMessage(receiverPhoneNumber: string, message: string) {
    const senderPhoneNumber = this.configService.get<string>('twilio.senderPhoneNumber')

    return this.twilioClient.messages.create({
      body: message,
      from: senderPhoneNumber,
      to: receiverPhoneNumber,
    })
  }
}
