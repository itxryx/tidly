import { MiddlewareHandler } from 'hono'

export const apiAuthentication = (): MiddlewareHandler => {
  return async (c, next) => {
    const validApiKey = c.env?.API_KEY

    if (!validApiKey) {
      return c.json({
        error: {
          code: 'SERVER_ERROR',
          message: 'Server configuration error'
        }
      }, 500)
    }

    const authHeader = c.req.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({
        error: {
          code: 'AUTHENTICATION_ERROR',
          message: 'Invalid or missing authorization'
        }
      }, 401)
    }

    const apiKey = authHeader.substring(7)

    if (apiKey !== validApiKey) {
      return c.json({
        error: {
          code: 'AUTHENTICATION_ERROR',
          message: 'Invalid API key'
        }
      }, 401)
    }

    await next()
  }
}