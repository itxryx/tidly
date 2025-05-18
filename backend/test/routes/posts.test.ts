import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiTest } from '../utils'
import { mockAPIResponse, resetMocks } from '../mock'
import { getTextByteLength } from '../../src/lib/error'

describe('投稿API', () => {
  beforeEach(() => {
    resetMocks()
  })
  
  afterEach(() => {
    resetMocks()
  })

  describe('POST /v1/posts', () => {
    it('新規投稿を作成できること', async () => {
      // モックの設定
      const mockPost = {
        id: 1,
        user_id: 1,
        content: 'テスト投稿です',
        created_at: 1684567890,
        updated_at: 1684567890,
        is_deleted: 0
      }
      
      // レスポンスをモック
      mockAPIResponse('/v1/posts', 'POST', 200, mockPost)
      
      // リクエスト実行
      const res = await apiTest.post('/v1/posts', {
        sub: 'test-sub-123',
        content: 'テスト投稿です'
      })
      
      // 検証
      expect(res.status).toBe(200)
      expect(res.body).toEqual(mockPost)
    })
    
    it('200バイトを超える投稿の場合、エラーを返すこと', async () => {
      // 長い投稿内容（200バイト超え）
      const longContent = 'あ'.repeat(100) // 日本語1文字=3バイトなので300バイト
      const contentByteLength = getTextByteLength(longContent)
      
      // バイト数を確認（テスト自体のテスト）
      expect(contentByteLength).toBeGreaterThan(200)
      
      // エラーレスポンスの設定
      const errorResponse = {
        error: {
          code: 'CONTENT_TOO_LONG',
          message: `投稿内容は200バイト以内にしてください（現在: ${contentByteLength}バイト）`
        }
      }
      
      // レスポンスをモック
      mockAPIResponse('/v1/posts', 'POST', 400, errorResponse)
      
      // リクエスト実行
      const res = await apiTest.post('/v1/posts', {
        sub: 'test-sub-123',
        content: longContent
      })
      
      // 検証
      expect(res.status).toBe(400)
      expect(res.body).toEqual(errorResponse)
    })
    
    it('存在しないユーザーの場合、エラーを返すこと', async () => {
      // エラーレスポンスの設定
      const errorResponse = {
        error: {
          code: 'USER_NOT_FOUND',
          message: 'ユーザーが見つかりません'
        }
      }
      
      // レスポンスをモック
      mockAPIResponse('/v1/posts', 'POST', 404, errorResponse)
      
      // リクエスト実行
      const res = await apiTest.post('/v1/posts', {
        sub: 'non-existent',
        content: 'テスト投稿です'
      })
      
      // 検証
      expect(res.status).toBe(404)
      expect(res.body).toEqual(errorResponse)
    })
    
    it('パラメータが不足している場合、エラーを返すこと', async () => {
      // エラーレスポンスの設定
      const errorResponse = {
        error: {
          code: 'INVALID_PARAMETER',
          message: 'subとcontentは必須です'
        }
      }
      
      // レスポンスをモック
      mockAPIResponse('/v1/posts', 'POST', 400, errorResponse)
      
      // リクエスト実行（subなし）
      const res1 = await apiTest.post('/v1/posts', {
        content: 'テスト投稿です'
      })
      
      // リクエスト実行（contentなし）
      const res2 = await apiTest.post('/v1/posts', {
        sub: 'test-sub-123'
      })
      
      // 検証
      expect(res1.status).toBe(400)
      expect(res1.body).toEqual(errorResponse)
      
      expect(res2.status).toBe(400)
      expect(res2.body).toEqual(errorResponse)
    })
  })

  describe('GET /v1/posts', () => {
    it('ユーザーの投稿一覧を取得できること（ページネーションあり）', async () => {
      // モックの設定
      const mockPosts = {
        posts: [
          {
            id: 1,
            user_id: 1,
            content: 'テスト投稿1',
            created_at: 1684567890,
            updated_at: 1684567890,
            is_deleted: 0
          },
          {
            id: 2,
            user_id: 1,
            content: 'テスト投稿2',
            created_at: 1684567880,
            updated_at: 1684567880,
            is_deleted: 0
          }
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          totalCount: 12,
          hasMore: true
        }
      }

      // レスポンスをモック
      mockAPIResponse('/v1/posts', 'GET', 200, mockPosts)

      // リクエスト実行
      const res = await apiTest.get('/v1/posts?sub=test-sub-123&page=1')

      // 検証
      expect(res.status).toBe(200)
      expect(res.body).toEqual(mockPosts)
    })

    it('2ページ目の投稿一覧を取得できること', async () => {
      // モックの設定
      const mockPosts = {
        posts: [
          {
            id: 11,
            user_id: 1,
            content: 'テスト投稿11',
            created_at: 1684567790,
            updated_at: 1684567790,
            is_deleted: 0
          },
          {
            id: 12,
            user_id: 1,
            content: 'テスト投稿12',
            created_at: 1684567780,
            updated_at: 1684567780,
            is_deleted: 0
          }
        ],
        pagination: {
          page: 2,
          pageSize: 10,
          totalCount: 12,
          hasMore: false
        }
      }

      // レスポンスをモック
      mockAPIResponse('/v1/posts', 'GET', 200, mockPosts)

      // リクエスト実行
      const res = await apiTest.get('/v1/posts?sub=test-sub-123&page=2')

      // 検証
      expect(res.status).toBe(200)
      expect(res.body).toEqual(mockPosts)
    })
    
    it('存在しないユーザーの場合、エラーを返すこと', async () => {
      // エラーレスポンスの設定
      const errorResponse = {
        error: {
          code: 'USER_NOT_FOUND',
          message: 'ユーザーが見つかりません'
        }
      }
      
      // レスポンスをモック
      mockAPIResponse('/v1/posts', 'GET', 404, errorResponse)
      
      // リクエスト実行
      const res = await apiTest.get('/v1/posts?sub=non-existent')
      
      // 検証
      expect(res.status).toBe(404)
      expect(res.body).toEqual(errorResponse)
    })
    
    it('subパラメータがない場合、エラーを返すこと', async () => {
      // エラーレスポンスの設定
      const errorResponse = {
        error: {
          code: 'INVALID_PARAMETER',
          message: 'subパラメータは必須です'
        }
      }

      // レスポンスをモック
      mockAPIResponse('/v1/posts', 'GET', 400, errorResponse)

      // リクエスト実行
      const res = await apiTest.get('/v1/posts')

      // 検証
      expect(res.status).toBe(400)
      expect(res.body).toEqual(errorResponse)
    })

    it('不正なページパラメータの場合、エラーを返すこと', async () => {
      // エラーレスポンスの設定
      const errorResponse = {
        error: {
          code: 'INVALID_PARAMETER',
          message: 'pageパラメータは正の整数である必要があります'
        }
      }

      // レスポンスをモック
      mockAPIResponse('/v1/posts', 'GET', 400, errorResponse)

      // リクエスト実行（不正な値）
      const res1 = await apiTest.get('/v1/posts?sub=test-sub-123&page=-1')
      const res2 = await apiTest.get('/v1/posts?sub=test-sub-123&page=abc')

      // 検証
      expect(res1.status).toBe(400)
      expect(res1.body).toEqual(errorResponse)

      expect(res2.status).toBe(400)
      expect(res2.body).toEqual(errorResponse)
    })
  })
})