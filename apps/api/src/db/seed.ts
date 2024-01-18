// import { faker } from '@faker-js/faker'
import { db } from '@/lib/db'

import { product /*, type Product*/ } from './schemas'

/**
 * Reset database
 */
db.delete(product)

console.log('✔ Database reset')

// const userSeed = (role: string = 'customer') => {
//   const { person, internet } = faker

//   const firstName = person.firstName()
//   const lastName = person.lastName()

//   return {
//     username: internet.userName({ firstName, lastName }),
//     email: internet.email({ firstName, lastName }),
//     firstName,
//     lastName,
//     role,
//   } as User
// }

/**
 * Create restaurant admin
 */
// await db.insert(user).values(userSeed('admin')).returning()

// console.log('✔ Created admin')

console.log('✔ Database seeded successfully!')

process.exit()
