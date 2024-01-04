import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface AuthenticationMagicLinkEmailProps {
  userEmail: string
  authLink: string
}

export function AuthenticationMagicLinkEmail({
  userEmail,
  authLink,
}: AuthenticationMagicLinkEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Faça login na Pizza Shop</Preview>

      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px] text-center">
              <span className="text-2xl">🍕</span>
            </Section>

            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Faça login na Pizza Shop
            </Heading>

            <Text className="text-[14px] leading-[24px] text-black">
              Você solicitou um link para login na Pizza Shop através do email{' '}
              {userEmail}.
            </Text>

            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-sky-500 px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={authLink}
              >
                Entrar agora
              </Button>
            </Section>

            <Text className="text-[14px] leading-[24px] text-black">
              ou copie a URL abaixo e cole em seu browser:{' '}
              <Link href={authLink} className="text-sky-500 no-underline">
                {authLink}
              </Link>
            </Text>

            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />

            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Se você não solicitou esse link de autenticação, apenas descarte
              esse e-mail.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default AuthenticationMagicLinkEmail
