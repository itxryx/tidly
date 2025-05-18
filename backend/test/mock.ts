import { vi } from 'vitest'
import app from '../src/index'

// APIエンドポイントの応答をモックする
export const mockAPIResponse = (path: string, method: string, status: number, body: any) => {
  const originalFetch = app.fetch
  
  vi.spyOn(app, 'fetch').mockImplementation(async (req, env, ctx) => {
    const url = new URL(req.url)
    
    // リクエストのパスとメソッドが一致する場合モックレスポンスを返す
    if (url.pathname === path && req.method === method) {
      const headers = new Headers({
        'Content-Type': typeof body === 'string' ? 'text/plain' : 'application/json'
      })
      
      const bodyContent = typeof body === 'string' 
        ? body 
        : JSON.stringify(body)
      
      return new Response(bodyContent, { status, headers })
    }
    
    // 一致しない場合は元のfetchを呼び出す
    return originalFetch.call(app, req, env, ctx)
  })
}

// モックをリセットする
export const resetMocks = () => {
  vi.restoreAllMocks()
}