import { StatusCode } from 'hono/utils/http-status'

export type ErrorCode =
  | 'INVALID_PARAMETER'
  | 'USER_NOT_FOUND'
  | 'CONTENT_TOO_LONG'
  | 'AUTHENTICATION_ERROR'
  | 'DATABASE_ERROR'
  | 'SERVER_ERROR'

export class ApiError extends Error {
  code: ErrorCode
  statusCode: StatusCode

  constructor(code: ErrorCode, message: string, statusCode: StatusCode = 400) {
    super(message)
    this.code = code
    this.statusCode = statusCode
    this.name = 'ApiError'
  }
}

export function formatErrorResponse(error: ApiError) {
  return {
    error: {
      code: error.code,
      message: error.message
    }
  }
}

export function getTextByteLength(text: string): number {
  return new TextEncoder().encode(text).length
}