// import { faker } from '@faker-js/faker'

import { db } from './db'
// import { hashPassword, md5hash } from '@/lib/bcrypt'
// import { getGravatar } from '@/lib/gravatar'

import { usersTable /*, type User */ } from './schemas'

/**
 * Reset database
 */
await db.delete(usersTable)

console.log('✔ Database reset')

// const userSeed = async (role = 'customer') => {
//   const { person, internet } = faker

//   const firstName = person.firstName()
//   const lastName = person.lastName()
//   const email = internet.email({ firstName, lastName })

//   const { hash, salt } = await hashPassword('Pa$$w0rd!')

//   return {
//     username: internet.userName({ firstName, lastName }).toLowerCase(),
//     email: internet.email({ firstName, lastName }).toLowerCase(),
//     firstName,
//     lastName,
//     avatar: getGravatar(md5hash(email)),
//     hash,
//     salt,
//     role,
//   } as User
// }

/**
 * Create customers
 */
// await db
//   .insert(usersTable)
//   .values([await userSeed(), await userSeed()])
//   .returning()

// console.log('✔ Created customers')

/**
 * Create manager
 */
// await db
//   .insert(usersTable)
//   .values(await userSeed('manager'))
//   .returning()

// console.log('✔ Created manager')

/**
 * Create admin
 */
// await db
//   .insert(usersTable)
//   .values(await userSeed('admin'))
//   .returning()

// console.log('✔ Created admin')

console.log('Database seeded successfully!')

process.exit()
