import app from '../src/index'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Mock } from 'vitest'
import { mockEnv, prisma } from './setup'

// Honoアプリのテスト用ハンドラー
export const createTestClient = () => {
  return {
    request: async (
      method: string,
      path: string,
      options: {
        headers?: Record<string, string>,
        body?: any
      } = {}
    ) => {
      const url = new URL(path, 'http://localhost')
      const req = new Request(url, {
        method,
        headers: new Headers(options.headers || {
          'Authorization': `Bearer ${mockEnv.API_KEY}`
        }),
        body: options.body ? JSON.stringify(options.body) : undefined
      })
      
      // リクエストのクローン作成（一度しか読めないため）
      const reqClone = req.clone()

      // Cloudflare環境のモック
      const env = { ...mockEnv }
      const ctx = { req: reqClone, env }
      
      // エラーハンドリング
      try {
        const res = await app.fetch(req, env)
        let body = null

        if (res.status !== 204) {
          try {
            const contentType = res.headers.get('content-type') || ''
            if (contentType.includes('application/json')) {
              body = await res.json()
            } else {
              body = await res.text()
            }
          } catch (e) {
            // JSONでなければテキストとして読み取る
            body = await res.clone().text()
          }
        }

        return {
          status: res.status,
          headers: res.headers,
          body
        }
      } catch (error) {
        console.error('Test request error:', error)
        throw error
      }
    }
  }
}

// APIテスト用のヘルパー関数
export const apiTest = {
  get: (path: string, options = {}) => {
    const client = createTestClient()
    return client.request('GET', path, options)
  },
  
  post: (path: string, body: any, options = {}) => {
    const client = createTestClient()
    return client.request('POST', path, {
      ...options,
      body
    })
  }
}

// モックリセット用のヘルパー
export const resetMocks = () => {
  vi.clearAllMocks()
  Object.values(prisma).forEach(entity => {
    if (typeof entity === 'object' && entity !== null) {
      Object.values(entity).forEach(method => {
        if (vi.isMockFunction(method)) {
          (method as Mock).mockReset()
        }
      })
    }
  })
}