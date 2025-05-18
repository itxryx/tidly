import { MiddlewareHandler } from 'hono'
import { StatusCode } from 'hono/utils/http-status'
import { ApiError, formatErrorResponse } from '../lib/error'

export const errorHandler = (): MiddlewareHandler => {
  return async (c, next) => {
    try {
      await next()
    } catch (error) {
      console.error(error)

      if (error instanceof ApiError) {
        c.status(error.statusCode)
        return c.json(formatErrorResponse(error))
      }

      const errorObj = error as Error & { code?: string, message?: string, cause?: any }
      const errorMessage = errorObj.message || 'Server error occurred'
      let errorCode: ApiError['code'] = 'SERVER_ERROR'
      let statusCode: StatusCode = 500

      if (errorMessage.includes('not found') || errorMessage.includes('No User found')) {
        errorCode = 'USER_NOT_FOUND'
        statusCode = 404
      } else if (errorObj.code === 'P2002') {
        errorCode = 'INVALID_PARAMETER'
        statusCode = 400
      } else if (errorObj.cause?.code === 'D1_ERROR' ||
          errorObj.message?.includes('database') ||
          errorObj.message?.includes('Prisma')) {
        errorCode = 'DATABASE_ERROR'
        statusCode = 503
      }

      const apiError = new ApiError(
        errorCode,
        errorMessage,
        statusCode
      )

      c.status(statusCode)
      return c.json(formatErrorResponse(apiError))
    }
  }
}