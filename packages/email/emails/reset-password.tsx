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

interface ResetPasswordEmailProps {
  firstName?: string
  resetPasswordLink?: string
  resetPasswordFromIp?: string
  resetPasswordFromLocation?: string
}

const baseUrl = process.env.ACME_BACKEND_URL
  ? `https://${process.env.ACME_BACKEND_URL}`
  : ''

export const ResetPasswordEmail = ({
  firstName,
  resetPasswordLink,
  resetPasswordFromIp,
  resetPasswordFromLocation,
}: ResetPasswordEmailProps) => {
  const previewText = 'Reset Acme password'

  return (
    <Html>
      <Head />

      <Preview>{previewText}</Preview>

      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
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

            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Reset your <strong>password</strong>?
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              A password reset link has been requested for your{' '}
              <strong>Acme</strong> account! Click the link below to reset your
              password account. The link expires in 2 hours.
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={resetPasswordLink}
              >
                Reset password
              </Button>
            </Section>

            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link
                href={resetPasswordLink}
                className="text-blue-600 no-underline"
              >
                {resetPasswordLink}
              </Link>
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This password reset was intended for{' '}
              <span className="text-black">{firstName}</span>. This password
              reset was sent from{' '}
              <span className="text-black">{resetPasswordFromIp}</span> located
              in <span className="text-black">{resetPasswordFromLocation}</span>
              . If you weren't expecting this password reset, please ignore this
              email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

ResetPasswordEmail.PreviewProps = {
  firstName: 'John',
  resetPasswordLink: 'https://acme.tld/reset-password/xyz',
  resetPasswordFromIp: '216.238.112.233',
  resetPasswordFromLocation: 'São Paulo, Brazil',
} as ResetPasswordEmailProps

export default ResetPasswordEmail
