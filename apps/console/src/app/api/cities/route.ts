import { type NextRequest, NextResponse } from 'next/server'

import cities from '@/cities.json'

export async function GET(req: NextRequest) {
  const ids = req.nextUrl.searchParams.get('id')?.split(',')

  if (!ids || ids.length === 0) return NextResponse.json(cities)

  const filteredCities = cities.filter((city) =>
    ids.some((id) => city.id === Number(id)),
  )

  return NextResponse.json(filteredCities)
}
