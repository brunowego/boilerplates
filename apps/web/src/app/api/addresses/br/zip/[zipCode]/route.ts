import { NextResponse } from 'next/server'

import { axios } from '@/lib/api'

type GetProps = {
  params: { zipCode: string }
}

export async function GET(_: Request, { params }: GetProps): Promise<Response> {
  const zipCode = params.zipCode

  if (!zipCode) {
    return new Response(null, {
      status: 404,
    })
  }

  try {
    const response = await axios
      .get(`${process.env.BRASILAPI_API_URL}/${zipCode}`)
      .then((res) => res.data)

    return NextResponse.json(response, {
      status: 200,
    })
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
    }

    return new Response(null, {
      status: 500,
    })
  }
}
