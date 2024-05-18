import {
  Body,
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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
  : ''

interface MagicLinkEmailProps {
  email?: string
  magicLink?: string
}

export const MagicLinkEmail = ({ email, magicLink }: MagicLinkEmailProps) => {
  const previewText = 'Email verification on Acme'

  return (
    <Html>
      <Tailwind>
        <Head />

        <Preview>{previewText}</Preview>

        <Body className='mx-auto my-auto bg-white px-2 font-sans'>
          <Container className='mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]'>
            <Section className='mt-[32px]'>
              <Img
                src={`${baseUrl}/static/logo.png`}
                width='48'
                height='48'
                alt='Acme'
                className='mx-auto my-0'
              />
            </Section>

            <Heading className='mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black'>
              Your login code for <strong>Acme</strong>
            </Heading>

            <Text className='text-[14px] text-black leading-[24px]'>
              Hello,
            </Text>

            <Text className='text-[14px] text-black leading-[24px]'>
              To sign-in, please click the button below. This link will expire
              in 5 min.
            </Text>

            <Section className='my-[32px] text-center'>
              <Link
                className='rounded bg-black px-5 py-3 text-center font-semibold text-[12px] text-white no-underline'
                href={magicLink}
              >
                Click here to sign in
              </Link>
            </Section>

            <Hr className='mx-0 my-[26px] w-full border border-[#eaeaea] border-solid' />

            <Text className='text-[#666666] text-[12px] leading-[24px]'>
              This link was intended for{' '}
              <span className='text-black'>{email}</span>. If you were not
              expecting this link, you can ignore this email. If you are
              concerned about your account's safety, please reply to this email
              to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

MagicLinkEmail.PreviewProps = {
  email: 'johndoe@example.com',
  magicLink: 'http://acme.tld/api/auth/callback/resend',
} as MagicLinkEmailProps

export default MagicLinkEmail
