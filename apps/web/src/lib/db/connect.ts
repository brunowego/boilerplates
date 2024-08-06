import mongoose from 'mongoose'

type ConnectionObject = {
  isConnected?: number
}

const connection: ConnectionObject = {}
const url = process.env.MONGO_URI as string

async function connect() {
  if (connection.isConnected) {
    return
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0]?.readyState

    if (connection.isConnected === 1) {
      return
    }

    await mongoose.disconnect()
  }

  const db = await mongoose.connect(url)

  connection.isConnected = db.connections[0]?.readyState
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect()

      connection.isConnected = 0
    }
  }
}

const db = { connect, disconnect }

export default db
