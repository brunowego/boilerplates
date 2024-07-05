import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 25

export function GET(): Response {
  return NextResponse.json({ ping: 'pong' }, { status: 200 })
}
