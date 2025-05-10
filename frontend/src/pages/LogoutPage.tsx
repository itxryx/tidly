import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/lib/AuthContext'

export default function LogoutPage() {
  const navigate = useNavigate()
  const { authState, logout } = useAuthContext()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const performLogout = async () => {
      try {
        if (authState.isAuthenticated) {
          await logout()
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
  }, [authState.isAuthenticated, logout, navigate])

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