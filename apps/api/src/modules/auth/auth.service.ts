import { Injectable } from '@nestjs/common'
import { sendEmail } from '@acme/mailer'
import { SignUpDto } from './signup.dto'
import { nanoid } from 'nanoid'

@Injectable()
export class AuthService {
  async signUp(signUpDto: SignUpDto): Promise<void> {
    // Register the user in the database

    await sendEmail('RegisterEmail', {
      to: signUpDto.email,
      subject: 'Welcome aboard!',
      props: {
        name: signUpDto.name,
        code: nanoid(6).toUpperCase(),
      },
    })
  }
}
