import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import { Fragment } from 'react'

const baseUrl = process.env.ACME_BACKEND_URL
  ? `https://${process.env.ACME_BACKEND_URL}`
  : ''

interface WaitListEmailProps {
  firstName?: string
  fromIp?: string
  fromLocation?: string
}

export const WaitListEmail = ({
  firstName,
  fromIp,
  fromLocation,
}: WaitListEmailProps) => {
  const previewText = 'Thank you for joining our waitlist'

  return (
    <Html>
      <Tailwind>
        <Fragment>
          <Head />

          <Preview>{previewText}</Preview>

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
                Coming Soon
              </Heading>

              <Text className='text-black text-[14px] leading-[24px]'>
                Thank you, <strong>{firstName}</strong>, for joining ACME's
                waitlist!
              </Text>

              <Text className='text-black text-[14px] leading-[24px]'>
                Can't wait to show you guys what we have planned as we roll out
                private beta tests over the next few weeks. Stay tuned and don't
                forget to spread the word!
              </Text>

              <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />

              <Text className='text-[#666666] text-[12px] leading-[24px]'>
                This check was intended for{' '}
                <span className='text-black'>{firstName}</span>. This magic link
                was sent from <span className='text-black'>{fromIp}</span>{' '}
                located in <span className='text-black'>{fromLocation}</span>.
                If you didn't expect this magic link, you can ignore this email.
              </Text>
            </Container>
          </Body>
        </Fragment>
      </Tailwind>
    </Html>
  )
}

WaitListEmail.PreviewProps = {
  firstName: 'John',
  fromIp: '216.238.112.233',
  fromLocation: 'São Paulo, Brazil',
} as WaitListEmailProps

export default WaitListEmail
