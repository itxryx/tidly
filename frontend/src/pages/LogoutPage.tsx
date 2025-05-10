import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

export default function LogoutPage() {
  const navigate = useNavigate()
  const auth = useAuth()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const performLogout = async () => {
      try {
        if (auth.isAuthenticated) {
          await auth.removeUser()

          const clientId = String(import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID)
          const logoutUri = String(import.meta.env.VITE_COGNITO_REDIRECT_SIGNOUT_URL)
          const cognitoDomain = `https://${String(import.meta.env.VITE_COGNITO_DOMAIN)}`
          window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
        } else {
          setTimeout(() => {
            navigate('/login')
          }, 1000)
        }
      } catch (err) {
        setError('An error occurred during logout process.')
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    }

    performLogout()
  }, [auth, navigate])

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 text-center">
          {error ? (
            <>
              <h1 className="text-2xl font-bold mb-4 text-destructive">Error</h1>
              <p className="mb-2">{error}</p>
              <p className="text-sm text-muted-foreground">Redirecting to login page...</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Logging Out...</h1>
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
              <p className="text-muted-foreground">Processing logout. Please wait a moment.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}