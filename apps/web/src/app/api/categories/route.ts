import { type NextRequest, NextResponse } from 'next/server'

import categories from '@/categories.json'

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get('id')?.split(',')

  if (!ids || ids.length === 0) return NextResponse.json(categories)

  const filteredCategories = categories.filter((category) =>
    ids.some((id) => category.id === Number(id)),
  )

  return NextResponse.json(filteredCategories)
}
