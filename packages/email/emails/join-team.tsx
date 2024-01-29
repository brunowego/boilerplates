import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface JoinTeamEmailProps {
  firstName?: string
  userImage?: string
  invitedByFirstName?: string
  invitedByEmail?: string
  teamName?: string
  teamImage?: string
  inviteLink?: string
  fromIp?: string
  fromLocation?: string
}

const baseUrl = process.env.ACME_BACKEND_URL
  ? `https://${process.env.ACME_BACKEND_URL}`
  : ''

export const JoinTeamEmail = ({
  firstName,
  userImage,
  invitedByFirstName,
  invitedByEmail,
  teamName,
  teamImage,
  inviteLink,
  fromIp,
  fromLocation,
}: JoinTeamEmailProps) => {
  const previewText = `Join ${invitedByFirstName} on Acme`

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
              Join <strong>{teamName}</strong> on <strong>Acme</strong>
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Hello {firstName},
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{invitedByFirstName}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{teamName}</strong> team on{' '}
              <strong>Acme</strong>.
            </Text>

            <Section>
              <Row>
                <Column align="right">
                  <Img
                    className="rounded-full"
                    src={userImage}
                    width="64"
                    height="64"
                  />
                </Column>

                <Column align="center">
                  <Img
                    src={`${baseUrl}/static/arrow.png`}
                    width="12"
                    height="9"
                    alt="invited you to"
                  />
                </Column>

                <Column align="left">
                  <Img
                    className="rounded-full"
                    src={teamImage}
                    width="64"
                    height="64"
                  />
                </Column>
              </Row>
            </Section>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>

            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{' '}
              <span className="text-black">{firstName}</span>. This invite was
              sent from <span className="text-black">{fromIp}</span> located in{' '}
              <span className="text-black">{fromLocation}</span>. If you were
              not expecting this invitation, you can ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

JoinTeamEmail.PreviewProps = {
  firstName: 'John',
  userImage: 'https://avatar.vercel.sh/john.doe.png',
  invitedByFirstName: 'Richard',
  invitedByEmail: 'richard.doe@acme.tld',
  teamName: 'Enigma',
  teamImage: 'https://avatar.vercel.sh/enigma.png',
  inviteLink: 'https://acme.tld/join-team/xyz',
  fromIp: '216.238.112.233',
  fromLocation: 'São Paulo, Brazil',
} as JoinTeamEmailProps

export default JoinTeamEmail
