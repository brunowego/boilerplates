import { Hono } from 'hono'

const app = new Hono()

app
  .get('/', (c) => c.json({ hello: 'world' }))
  .get('/ping', (c) => c.json({ ping: 'pong' }))

export default app
