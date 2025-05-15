import { Hono } from 'hono'
import { apiAuthentication } from './middlewares/api-authentication'

const app = new Hono()

app.use('*', apiAuthentication())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
