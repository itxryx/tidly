import { Hono } from 'hono'
import { apiAuthMiddleware } from './middlewares/api-auth-middleware'

const app = new Hono()

app.use('/', apiAuthMiddleware)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
