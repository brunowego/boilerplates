import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { User } from '@acme/db'
import moment from 'moment'
import * as nodemailer from 'nodemailer'
import { SettingService } from 'src/modules/setting/setting.service'

@Injectable()
export class EmailService {
  constructor(private settingService: SettingService) {}
  private readonly logger = new Logger(EmailService.name)

  getTransporter() {
    if (!this.settingService.get('smtp.enabled'))
      throw new InternalServerErrorException('SMTP is disabled')

    return nodemailer.createTransport({
      host: this.settingService.get('smtp.host'),
      port: this.settingService.get('smtp.port'),
      secure: this.settingService.get('smtp.port') == 465,
      auth: {
        user: this.settingService.get('smtp.username'),
        pass: this.settingService.get('smtp.password'),
      },
    })
  }

  private async sendMail(email: string, subject: string, text: string) {
    await this.getTransporter()
      .sendMail({
        from: `"${this.settingService.get('general.appName')}" <${this.settingService.get(
          'smtp.email'
        )}>`,
        to: email,
        subject,
        text,
      })
      .catch((e) => {
        this.logger.error(e)
        throw new InternalServerErrorException('Failed to send email')
      })
  }

  async sendMailToShareRecipients(
    recipientEmail: string,
    shareId: string,
    creator?: User,
    description?: string,
    expiration?: Date
  ) {
    if (!this.settingService.get('email.enableShareEmailRecipients'))
      throw new InternalServerErrorException('Email service disabled')

    const shareUrl = `${this.settingService.get('general.appUrl')}/share/${shareId}`

    await this.sendMail(
      recipientEmail,
      this.settingService.get('email.shareRecipientsSubject'),
      this.settingService
        .get('email.shareRecipientsMessage')
        .replaceAll('\\n', '\n')
        .replaceAll('{creator}', creator?.username ?? 'Someone')
        .replaceAll('{shareUrl}', shareUrl)
        .replaceAll('{desc}', description ?? 'No description')
        .replaceAll(
          '{expires}',
          moment(expiration).unix() != 0 ? moment(expiration).fromNow() : 'in: never'
        )
    )
  }

  async sendMailToReverseShareCreator(recipientEmail: string, shareId: string) {
    const shareUrl = `${this.settingService.get('general.appUrl')}/share/${shareId}`

    await this.sendMail(
      recipientEmail,
      this.settingService.get('email.reverseShareSubject'),
      this.settingService
        .get('email.reverseShareMessage')
        .replaceAll('\\n', '\n')
        .replaceAll('{shareUrl}', shareUrl)
    )
  }

  async sendResetPasswordEmail(recipientEmail: string, token: string) {
    const resetPasswordUrl = `${this.settingService.get(
      'general.appUrl'
    )}/auth/reset-password/${token}`

    await this.sendMail(
      recipientEmail,
      this.settingService.get('email.resetPasswordSubject'),
      this.settingService
        .get('email.resetPasswordMessage')
        .replaceAll('\\n', '\n')
        .replaceAll('{url}', resetPasswordUrl)
    )
  }

  async sendInviteEmail(recipientEmail: string, password: string) {
    const loginUrl = `${this.settingService.get('general.appUrl')}/auth/signin`

    await this.sendMail(
      recipientEmail,
      this.settingService.get('email.inviteSubject'),
      this.settingService
        .get('email.inviteMessage')
        .replaceAll('{url}', loginUrl)
        .replaceAll('{password}', password)
    )
  }

  async sendTestMail(recipientEmail: string) {
    await this.getTransporter()
      .sendMail({
        from: `"${this.settingService.get('general.appName')}" <${this.settingService.get(
          'smtp.email'
        )}>`,
        to: recipientEmail,
        subject: 'Test email',
        text: 'This is a test email',
      })
      .catch((e) => {
        this.logger.error(e)
        throw new InternalServerErrorException(e.message)
      })
  }
}
