export default {
    async fetch(request, env, ctx) {
      const USERNAME = env.BASIC_AUTH_USERNAME
      const PASSWORD = env.BASIC_AUTH_PASSWORD
      
      const AUTH_STRING = `${USERNAME}:${PASSWORD}`
      const EXPECTED_AUTH = `Basic ${btoa(AUTH_STRING)}`
  
      const authHeader = request.headers.get('Authorization')
  
      if (!authHeader || authHeader !== EXPECTED_AUTH) {
        return new Response('Unauthorized', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
            'Content-Type': 'text/plain'
          }
        })
      }

      return env.ASSETS.fetch(request)
    }
  }