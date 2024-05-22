import { NextResponse } from 'next/server'

import { getFirstUser } from '@acme/db/queries'

export async function GET() {
  try {
    const response = await getFirstUser()

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

// export const PATCH = auth(async function PATCH(req) {
//   if (!req.auth) {
//     return new NextResponse(null, {
//       status: 401,
//     })
//   }

//   const userId = req.auth.user.id

//   if (!userId) {
//     return new NextResponse(null, {
//       status: 404,
//     })
//   }

//   try {
//     const profile = await getProfileByUserId(userId)

//     if (!profile) {
//       return new Response(null, { status: 404 })
//     }

//     const json: InsertProfile = await req.json()

//     const result = insertProfileSchema.parse({
//       ...profile,
//       ...json,
//     })

//     await db
//       .update(profilesTable)
//       .set({
//         firstName: result.firstName,
//         lastName: result.lastName,
//       })
//       .where(eq(profilesTable.userId, userId))

//     await db
//       .update(usersTable)
//       .set({
//         fullName: !result.lastName
//           ? result.firstName
//           : `${result.firstName} ${result.lastName}`,
//         image: result.image,
//         language: result.language,
//         timezone: result.timezone,
//         onboarded: true,
//       })
//       .where(eq(usersTable.id, userId))

//     return new Response(null, {
//       status: 200,
//     })
//   } catch (err) {
//     if (process.env.NODE_ENV === 'development') {
//       console.error(err)
//     }

//     return new Response(null, {
//       status: 500,
//     })
//   }
// })
