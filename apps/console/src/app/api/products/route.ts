import { NextResponse } from 'next/server'
import { initialize as initializeService } from '@medusajs/store'

export async function GET(): Promise<NextResponse> {
  const storeService = await initializeService()
  const data = await storeService

  return NextResponse.json({ stores: data })
}
