import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

export default function LoginCallbackPage() {
  const navigate = useNavigate()
  const auth = useAuth()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (auth.isLoading) return
    if (auth.error) {
      setError('Authentication error occurred. Please login again.')
      setTimeout(() => {
        navigate('/login')
      }, 3000)
      return
    }

    if (auth.isAuthenticated) {
      navigate('/top')
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.error, navigate])

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 text-center">
          {error ? (
            <>
              <h1 className="text-2xl font-bold mb-4 text-destructive">Authentication Error</h1>
              <p className="mb-2">{error}</p>
              <p className="text-sm text-muted-foreground">Redirecting to login page...</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Authenticating...</h1>
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
              <p className="text-muted-foreground">Verifying your credentials. Please wait a moment.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}