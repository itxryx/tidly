export default {
  async fetch(request, env, ctx) {
    // Basic認証を適用
    const authResult = checkAuthentication(request, env)
    if (!authResult.success) {
      return authResult.response
    }
    
    const url = new URL(request.url)
    const isAssetRequest = /\.(css|js|png|jpg|jpeg|svg|ico|json|woff|woff2|ttf|otf)$/.test(url.pathname)
    
    // index.htmlへのリクエストを処理
    if (!isAssetRequest) {
      const indexRequest = new Request(`${url.origin}/index.html`, request)
      const response = await env.ASSETS.fetch(indexRequest)
      
      const customHeaders = {
        'X-Robots-Tag': 'noindex, nofollow'
      }
      
      // ヘッダーを追加
      const newResponse = appendHeaders(response, customHeaders)
      return newResponse
    }
    
    const response = await env.ASSETS.fetch(request)
    
    const customHeaders = {
      'X-Robots-Tag': 'noindex, nofollow'
    }
    
    // ヘッダーを追加
    const newResponse = appendHeaders(response, customHeaders)

    return newResponse
  }
}

/**
 * Basic認証を適用
 */
function checkAuthentication(request, env) {
  const username = env.BASIC_AUTH_USERNAME
  const password = env.BASIC_AUTH_PASSWORD
  
  const authString = `${username}:${password}`
  const expectedAuth = `Basic ${btoa(authString)}`

  const authHeader = request.headers.get('Authorization')

  if (!authHeader || authHeader !== expectedAuth) {
    return {
      success: false,
      response: new Response('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
          'Content-Type': 'text/plain'
        }
      })
    }
  }
  
  return { success: true }
}

/**
 * ヘッダーを追加
 */
function appendHeaders(response, headers) {
  const newResponse = new Response(response.body, response)

  Object.entries(headers).forEach(([key, value]) => {
    newResponse.headers.append(key, value)
  })
  
  return newResponse
}