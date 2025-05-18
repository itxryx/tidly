import { Hono } from 'hono'
import { getDB } from '../lib/db'
import { ApiError } from '../lib/error'
import { CreateUserRequest, GetUserRequest, User } from '../types'

type Bindings = {
  DB: CloudflareBindings['DB']
}

const users = new Hono<{ Bindings: Bindings }>()

users.post('/', async (c) => {
  const prisma = getDB(c.env)
  const body = await c.req.json<CreateUserRequest>()

  if (!body.sub || !body.email) {
    throw new ApiError('INVALID_PARAMETER', 'sub and email are required', 400)
  }

  const now = Math.floor(Date.now() / 1000)

  try {
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { cognito_sub: body.sub },
          { email: body.email }
        ]
      }
    })

    if (user) {
      if (user.cognito_sub !== body.sub) {
        throw new ApiError('INVALID_PARAMETER', 'This email address is already in use', 400)
      }
    } else {
      try {
        user = await prisma.user.create({
          data: {
            cognito_sub: body.sub,
            email: body.email,
            created_at: now,
            updated_at: now
          }
        })
      } catch (err) {
        const createError = err as Error & { code?: string }
        if (createError.code === 'P2002') {
          throw new ApiError('INVALID_PARAMETER', 'This email address is already in use', 400)
        }
        throw createError
      }
    }

    const responseUser: User = {
      id: user.id,
      created_at: user.created_at,
      updated_at: user.updated_at,
      cognito_sub: user.cognito_sub,
      email: user.email
    }

    return c.json(responseUser)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    console.error('Error creating/fetching user:', error)
    throw new ApiError('SERVER_ERROR', 'Error occurred while creating user', 500)
  }
})

users.get('/', async (c) => {
  const prisma = getDB(c.env)
  const sub = c.req.query('sub')

  if (!sub) {
    throw new ApiError('INVALID_PARAMETER', 'sub parameter is required', 400)
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        cognito_sub: sub
      }
    })

    if (!user) {
      throw new ApiError('USER_NOT_FOUND', 'User not found', 404)
    }

    const responseUser: User = {
      id: user.id,
      created_at: user.created_at,
      updated_at: user.updated_at,
      cognito_sub: user.cognito_sub,
      email: user.email
    }

    return c.json(responseUser)
  } catch (error) {
    console.error('Error fetching user:', error)

    if (error instanceof ApiError) {
      throw error
    }

    throw new ApiError('SERVER_ERROR', 'Error occurred while retrieving user', 500)
  }
})

export default users