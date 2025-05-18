import { Hono } from 'hono'
import { getDB } from '../lib/db'
import { ApiError, getTextByteLength } from '../lib/error'
import { getConfig } from '../lib/config'
import { CreatePostRequest, Post } from '../types'

type Bindings = {
  DB: CloudflareBindings['DB']
}

const DEFAULT_PAGE_SIZE = 10

const posts = new Hono<{ Bindings: Bindings }>()

posts.get('/', async (c) => {
  const prisma = getDB(c.env)
  const sub = c.req.query('sub')
  const page = parseInt(c.req.query('page') || '1', 10)

  if (isNaN(page) || page < 1) {
    throw new ApiError('INVALID_PARAMETER', 'page parameter must be a positive integer', 400)
  }

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

    const dbPosts = await prisma.post.findMany({
      where: {
        user_id: user.id,
        is_deleted: 0
      },
      orderBy: {
        created_at: 'desc'
      },
      skip: (page - 1) * DEFAULT_PAGE_SIZE,
      take: DEFAULT_PAGE_SIZE
    })

    const totalCount = await prisma.post.count({
      where: {
        user_id: user.id,
        is_deleted: 0
      }
    })

    const formattedPosts: Post[] = dbPosts.map(post => ({
      id: post.id,
      created_at: post.created_at,
      updated_at: post.updated_at,
      user_id: post.user_id,
      content: post.content,
      is_deleted: post.is_deleted
    }))

    const hasMore = totalCount > page * DEFAULT_PAGE_SIZE

    return c.json({
      posts: formattedPosts,
      pagination: {
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        totalCount,
        hasMore
      }
    })
  } catch (error) {
    console.error('Error fetching posts:', error)

    if (error instanceof ApiError) {
      throw error
    }

    throw new ApiError('SERVER_ERROR', 'Error occurred while retrieving posts', 500)
  }
})

posts.post('/', async (c) => {
  const prisma = getDB(c.env)
  const body = await c.req.json<CreatePostRequest>()

  if (!body.sub || !body.content) {
    throw new ApiError('INVALID_PARAMETER', 'sub and content are required', 400)
  }

  const config = getConfig(c.env)
  const contentByteLength = getTextByteLength(body.content)
  if (contentByteLength > config.maxPostBytes) {
    throw new ApiError(
      'CONTENT_TOO_LONG',
      `Content must be within ${config.maxPostBytes} bytes (current: ${contentByteLength} bytes)`,
      400
    )
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        cognito_sub: body.sub
      }
    })

    if (!user) {
      throw new ApiError('USER_NOT_FOUND', 'User not found', 404)
    }

    const now = Math.floor(Date.now() / 1000)

    const newPost = await prisma.post.create({
      data: {
        user_id: user.id,
        content: body.content,
        created_at: now,
        updated_at: now,
        is_deleted: 0
      }
    })

    const responsePost: Post = {
      id: newPost.id,
      created_at: newPost.created_at,
      updated_at: newPost.updated_at,
      user_id: newPost.user_id,
      content: newPost.content,
      is_deleted: newPost.is_deleted
    }

    return c.json(responsePost)
  } catch (error) {
    console.error('Error creating post:', error)

    if (error instanceof ApiError) {
      throw error
    }

    throw new ApiError('SERVER_ERROR', 'Error occurred while creating post', 500)
  }
})

export default posts