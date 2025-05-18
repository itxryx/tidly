import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiTest } from '../utils'
import { mockAPIResponse, resetMocks } from '../mock'

describe('ユーザーAPI', () => {
  beforeEach(() => {
    resetMocks()
  })

  afterEach(() => {
    resetMocks()
  })

  describe('POST /v1/users', () => {
    it('新規ユーザーを作成できること', async () => {
      // モックの設定
      const mockUser = {
        id: 1,
        cognito_sub: 'test-sub-123',
        email: 'test@example.com',
        created_at: 1684567890,
        updated_at: 1684567890
      }

      // レスポンスをモック
      mockAPIResponse('/v1/users', 'POST', 200, mockUser)

      // リクエスト実行
      const res = await apiTest.post('/v1/users', {
        sub: 'test-sub-123',
        email: 'test@example.com'
      })

      // 検証
      expect(res.status).toBe(200)
      expect(res.body).toEqual(mockUser)
    })
    
    it('既存のユーザーを返すこと', async () => {
      // モックの設定
      const mockUser = {
        id: 1,
        cognito_sub: 'test-sub-123',
        email: 'test@example.com',
        created_at: 1684567890,
        updated_at: 1684567890
      }

      // レスポンスをモック
      mockAPIResponse('/v1/users', 'POST', 200, mockUser)

      // リクエスト実行
      const res = await apiTest.post('/v1/users', {
        sub: 'test-sub-123',
        email: 'test@example.com'
      })

      // 検証
      expect(res.status).toBe(200)
      expect(res.body).toEqual(mockUser)
    })
    
    it('異なるsubで同じemailが存在する場合、エラーを返すこと', async () => {
      // モックの設定
      const errorResponse = {
        error: {
          code: 'INVALID_PARAMETER',
          message: 'このメールアドレスは既に使用されています'
        }
      }

      // レスポンスをモック
      mockAPIResponse('/v1/users', 'POST', 400, errorResponse)

      // リクエスト実行
      const res = await apiTest.post('/v1/users', {
        sub: 'test-sub-123',
        email: 'test@example.com'
      })

      // 検証
      expect(res.status).toBe(400)
      expect(res.body).toEqual(errorResponse)
    })
    
    it('パラメータが不足している場合、エラーを返すこと', async () => {
      // モックの設定
      const errorResponse = {
        error: {
          code: 'INVALID_PARAMETER',
          message: 'subとemailは必須です'
        }
      }

      // レスポンスをモック
      mockAPIResponse('/v1/users', 'POST', 400, errorResponse)

      // リクエスト実行（subなし）
      const res1 = await apiTest.post('/v1/users', {
        email: 'test@example.com'
      })

      // リクエスト実行（emailなし）
      const res2 = await apiTest.post('/v1/users', {
        sub: 'test-sub-123'
      })

      // 検証
      expect(res1.status).toBe(400)
      expect(res1.body).toEqual(errorResponse)

      expect(res2.status).toBe(400)
      expect(res2.body).toEqual(errorResponse)
    })
  })

  describe('GET /v1/users', () => {
    it('ユーザー情報を取得できること', async () => {
      // モックの設定
      const mockUser = {
        id: 1,
        cognito_sub: 'test-sub-123',
        email: 'test@example.com',
        created_at: 1684567890,
        updated_at: 1684567890
      }

      // レスポンスをモック
      mockAPIResponse('/v1/users', 'GET', 200, mockUser)

      // リクエスト実行
      const res = await apiTest.get('/v1/users?sub=test-sub-123')

      // 検証
      expect(res.status).toBe(200)
      expect(res.body).toEqual(mockUser)
    })

    it('存在しないユーザーの場合、エラーを返すこと', async () => {
      // モックの設定
      const errorResponse = {
        error: {
          code: 'USER_NOT_FOUND',
          message: 'ユーザーが見つかりません'
        }
      }

      // レスポンスをモック
      mockAPIResponse('/v1/users', 'GET', 404, errorResponse)

      // リクエスト実行
      const res = await apiTest.get('/v1/users?sub=non-existent')

      // 検証
      expect(res.status).toBe(404)
      expect(res.body).toEqual(errorResponse)
    })

    it('subパラメータがない場合、エラーを返すこと', async () => {
      // モックの設定
      const errorResponse = {
        error: {
          code: 'INVALID_PARAMETER',
          message: 'subパラメータは必須です'
        }
      }

      // レスポンスをモック
      mockAPIResponse('/v1/users', 'GET', 400, errorResponse)

      // リクエスト実行
      const res = await apiTest.get('/v1/users')

      // 検証
      expect(res.status).toBe(400)
      expect(res.body).toEqual(errorResponse)
    })
  })
})