import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const maxDuration = 25

export async function GET() {
  return NextResponse.json({ ping: 'pong' }, { status: 200 })
}

export async function POST(req: Request) {
  const body = await req.json()

  return NextResponse.json({ ping: body }, { status: 200 })
}
