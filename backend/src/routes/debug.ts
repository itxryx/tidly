import { Hono } from 'hono'

const debug = new Hono()

debug.get('/', (c) => {
  return c.json({ 
    env: {
      apiKey: c.env.API_KEY || 'not set'
    }
  })
})

export default debug