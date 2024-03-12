import { cookies } from 'next/headers'

export async function GET(): Promise<Response> {
  const redirect = cookies().get('redirect_uri')

  let redirectUrl = process.env.NEXT_PUBLIC_BASE_URL as string

  if (redirect) {
    redirectUrl = new URL(redirect.value).toString()

    cookies().delete('redirect_uri')
  }

  return Response.redirect(redirectUrl)
}
