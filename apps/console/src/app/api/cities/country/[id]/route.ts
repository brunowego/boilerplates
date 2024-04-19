import { type NextRequest, NextResponse } from 'next/server'

import cities from '@/cities.json'

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const filteredCities = cities.filter(
    (city) => city.country_id === Number(params.id),
  )

  return NextResponse.json(filteredCities)
}
