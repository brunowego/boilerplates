import { NextResponse, type NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    return NextResponse.json(body)
  } catch (error) {}
}
