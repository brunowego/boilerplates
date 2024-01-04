import { http, HttpResponse } from 'msw'

import { SignInRequest } from '../sign-in'

export const signInMock = http.post<never, SignInRequest>(
  '/v1/authenticate',
  async ({ request }) => {
    const { email } = await request.json()

    if (email === 'john.doe@example.tld') {
      return new HttpResponse(null, {
        headers: {
          'Set-Cookie': 'auth=sample-jwt-token',
        },
      })
    } else {
      return new HttpResponse(null, { status: 401 })
    }
  },
)
