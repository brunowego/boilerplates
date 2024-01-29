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

interface EmailVerificationEmailProps {
  firstName?: string
  magicLink?: string
  magicCode?: string
  fromIp?: string
  fromLocation?: string
}

const baseUrl = process.env.ACME_BACKEND_URL
  ? `https://${process.env.ACME_BACKEND_URL}`
  : ''

export const EmailVerificationEmail = ({
  firstName,
  magicLink,
  magicCode,
  fromIp,
  fromLocation,
}: EmailVerificationEmailProps) => {
  const previewText = 'Email verification on Acme'

  return (
    <Html>
      <Head />

      <Preview>{previewText}</Preview>

      <Tailwind>
        <Body className="px-2 my-auto mx-auto font-sans bg-white">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/logo.png`}
                width="48"
                height="48"
                alt="Acme"
                className="my-0 mx-auto"
              />
            </Section>

            <Heading className="p-0 mx-0 font-normal text-center text-black text-[24px] my-[30px]">
              Your login code for <strong>Acme</strong>
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Hello {firstName},
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              To sign-in, please click the button below. This link will expire
              in 5 min.
            </Text>

            <Section className="text-center my-[32px]">
              <Link
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={magicLink}
              >
                Click here to sign in
              </Link>
            </Section>

            <Text className="text-black text-[14px] leading-[24px]">
              If the link does not work, you can use the login verification code
              directly:
            </Text>

            <Section className="text-center my-[24px]">
              <code className="p-2 text-lg font-medium tracking-widest bg-gray-100 rounded-md">
                {magicCode}
              </code>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This check was intended for{' '}
              <span className="text-black">{firstName}</span>. This magic link
              was sent from <span className="text-black">{fromIp}</span> located
              in <span className="text-black">{fromLocation}</span>. If you
              didn't expect this magic link, you can ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

EmailVerificationEmail.PreviewProps = {
  firstName: 'John',
  magicLink: 'https://acme.tld/magic-link/ab123-4567c',
  magicCode: 'AB123-4567C',
  fromIp: '216.238.112.233',
  fromLocation: 'São Paulo, Brazil',
} as EmailVerificationEmailProps

export default EmailVerificationEmail
