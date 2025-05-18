import type { D1Database } from '@cloudflare/workers-types'

declare global {
  interface CloudflareBindings {
    DB: D1Database
    API_KEY: string
    MAX_POST_BYTES: string
    ALLOWED_ORIGINS: string
  }
}

export {}