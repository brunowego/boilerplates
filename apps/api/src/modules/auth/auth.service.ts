import { Injectable } from '@nestjs/common'
import { sendEmail } from '@acme/mailer'
import { SignUpDto } from './signup.dto'
import { customAlphabet } from 'nanoid'

@Injectable()
export class AuthService {
  async signUp(signUpDto: SignUpDto): Promise<void> {
    // Register the user in the database

    const nanoid = customAlphabet('1234567890ABCDEF', 6)

    await sendEmail('RegisterEmail', {
      to: signUpDto.email,
      subject: 'Welcome aboard!',
      props: {
        name: signUpDto.name,
        code: nanoid(),
      },
    })
  }
}
