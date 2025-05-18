import { MiddlewareHandler } from 'hono'

export const cors = (): MiddlewareHandler => {
  return async (c, next) => {
    const allowedOrigins = c.env.ALLOWED_ORIGINS ? c.env.ALLOWED_ORIGINS.split(',') : ['*']
    const origin = c.req.header('Origin') || ''
    const allowOrigin = allowedOrigins.includes('*') || allowedOrigins.includes(origin) ? origin : ''

    if (c.req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': allowOrigin || '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      })
    }

    await next()

    c.res.headers.set('Access-Control-Allow-Origin', allowOrigin || '*')
    c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }
}