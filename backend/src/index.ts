import { Hono } from 'hono'
import { apiAuthentication } from './middlewares/api-authentication'
import { errorHandler } from './middlewares/error-handler'
import { cors } from './middlewares/cors'
import usersRouter from './routes/users'
import postsRouter from './routes/posts'

type Bindings = CloudflareBindings

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors())
app.use('*', errorHandler())
app.use('/v1/*', apiAuthentication())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/v1/users', usersRouter)
app.route('/v1/posts', postsRouter)

export default app
export { app }
