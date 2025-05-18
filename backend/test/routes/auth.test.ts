import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiTest, resetMocks } from '../utils'

describe('認証とエラーハンドリング', () => {
  beforeEach(() => {
    resetMocks()
  })

  describe('認証', () => {
    it('認証なしでアクセスするとエラーを返すこと', async () => {
      // 認証ヘッダーなしのリクエスト
      const res = await apiTest.get('/v1/users', {
        headers: {} // 認証ヘッダーを省略
      })

      // 検証
      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toHaveProperty('message', 'Invalid or missing authorization')
    })

    it('間違ったAPIキーでアクセスするとエラーを返すこと', async () => {
      // 間違ったAPIキーでのリクエスト
      const res = await apiTest.get('/v1/users', {
        headers: {
          'Authorization': 'Bearer wrong-api-key'
        }
      })

      // 検証
      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toHaveProperty('message', 'Invalid API key')
    })
    
    it('正しいAPIキーでアクセスすると成功すること', async () => {
      // 正しいAPIキーでのリクエスト（ルートURLへのリクエスト）
      const res = await apiTest.get('/')

      // 検証
      expect(res.status).toBe(200)
      expect(typeof res.body).toBe('string')
      expect(res.body).toContain('Hello Hono!')
    })
  })

  describe('ルートエンドポイント', () => {
    it('GET / が正常に動作すること', async () => {
      // リクエスト実行
      const res = await apiTest.get('/')

      // 検証
      expect(res.status).toBe(200)
      expect(typeof res.body).toBe('string')
      expect(res.body).toContain('Hello Hono!')
    })
  })

  describe('存在しないエンドポイント', () => {
    it('存在しないエンドポイントにアクセスするとエラーを返すこと', async () => {
      // 存在しないエンドポイントへのリクエスト
      const res = await apiTest.get('/non-existent-endpoint')
      
      // 検証
      expect(res.status).toBe(404)
    })
  })
})