import mongoose from 'mongoose'

import { seedUsers } from './models/user'

export const connectToDB = async (mongoUri: string) => {
  console.log(`Connecting to DB. URL: ${mongoUri}`)

  await mongoose.connect(mongoUri)

  console.log('Connected to DB!')

  await Promise.all([seedUsers()])
}

export const disconnectFromDB = async () => {
  await mongoose.disconnect()

  console.log('Disconnected from DB!')
}
