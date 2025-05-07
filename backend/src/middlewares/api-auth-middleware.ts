import { Context, Next } from 'hono'

export const apiAuthMiddleware = async (c: Context, next: Next) => {
  const VALID_API_KEY = c.env?.API_KEY

  if (!VALID_API_KEY) {
    return c.json(
      {
        error: 'API_KEY is not set in environment variables'
      },
      500
    )
  }

  const AUTH_HEADER = c.req.header('Authorization')
  
  if (!AUTH_HEADER || !AUTH_HEADER.startsWith('Bearer ')) {
    return c.json(
      {
        error: 'No or invalid API Key header'
      },
      401
    )
  }

  const API_KEY = AUTH_HEADER.replace('Bearer ', '')

  if (API_KEY !== VALID_API_KEY) {
    return c.json(
      {
        error: 'Invalid API Key'
      },
      401
    )
  }

  await next()
}