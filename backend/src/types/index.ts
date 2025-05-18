export type User = {
  id: number
  created_at: number
  updated_at: number
  cognito_sub: string
  email: string
}

export type Post = {
  id: number
  created_at: number
  updated_at: number
  user_id: number
  content: string
  is_deleted: number
}

export type CreateUserRequest = {
  sub: string
  email: string
}

export type CreatePostRequest = {
  sub: string
  content: string
}

export type GetUserRequest = {
  sub: string
}

export type GetPostsRequest = {
  sub: string
}