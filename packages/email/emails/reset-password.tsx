import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface EmailVerificationEmailProps {
  firstName?: string
  resetLink?: string
  fromIp?: string
  fromLocation?: string
}

const baseUrl = process.env.ACME_BACKEND_URL
  ? `https://${process.env.ACME_BACKEND_URL}`
  : ''

export const EmailVerificationEmail = ({
  firstName,
  resetLink,
  fromIp,
  fromLocation,
}: EmailVerificationEmailProps) => {
  const previewText = 'Password reset on Acme'

  return (
    <Html>
      <Head />

      <Preview>{previewText}</Preview>

      <Tailwind>
        <Body className='px-2 my-auto mx-auto font-sans bg-white'>
          <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]'>
            <Section className='mt-[32px]'>
              <Img
                src={`${baseUrl}/static/logo.png`}
                width='48'
                height='48'
                alt='Acme'
                className='my-0 mx-auto'
              />
            </Section>

            <Heading className='p-0 mx-0 font-normal text-center text-black text-[24px] my-[30px]'>
              Let's <strong>verify</strong> your account
            </Heading>

            <Text className='text-black text-[14px] leading-[24px]'>
              Hello {firstName},
            </Text>

            <Text className='text-black text-[14px] leading-[24px]'>
              A password reset link has been requested for your{' '}
              <strong>Acme</strong> account! Click the link below to reset your
              password account. The link expires in 2 hours.
            </Text>

            <Section className='text-center mt-[32px] mb-[32px]'>
              <Button
                className='bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3'
                href={resetLink}
              >
                Reset password
              </Button>
            </Section>

            <Text className='text-black text-[14px] leading-[24px]'>
              or copy and paste this URL into your browser:{' '}
              <Link href={resetLink} className='text-blue-600 no-underline'>
                {resetLink}
              </Link>
            </Text>

            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />

            <Text className='text-[#666666] text-[12px] leading-[24px]'>
              This password reset was intended for{' '}
              <span className='text-black'>{firstName}</span>. This password
              reset was sent from <span className='text-black'>{fromIp}</span>{' '}
              located in <span className='text-black'>{fromLocation}</span>. If
              you weren't expecting this password reset, please ignore this
              email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

EmailVerificationEmail.PreviewProps = {
  firstName: 'John',
  resetLink: 'https://acme.tld/reset-password/xyz',
  fromIp: '216.238.112.233',
  fromLocation: 'São Paulo, Brazil',
} as EmailVerificationEmailProps

export default EmailVerificationEmail
