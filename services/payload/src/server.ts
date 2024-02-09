import express from 'express'
import payload from 'payload'

const { PAYLOAD_SECRET_KEY, PORT } = process.env

const app = express()

async function start() {
  await payload.init({
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
    secret: PAYLOAD_SECRET_KEY,
  })

  app.listen(PORT, async () => {
    console.log(
      `Express is now listening for incoming connections on http://localhost:${PORT}.`,
    )
  })
}

start()
