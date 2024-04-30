import { cookies } from 'next/headers'

export async function GET(): Promise<Response> {
  let url = process.env.NEXT_PUBLIC_APP_URL as string

  const next = cookies().get('next')

  if (next) {
    url = new URL(next.value).href

    cookies().delete('next')
  }

  return Response.redirect(url)
}
