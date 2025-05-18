import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'
import type { ErrorContext } from 'react-oidc-context'
import MainLayout from '../components/MainLayout'
import { userApi } from '../api'
import { useUser } from '../contexts/UserContext'

const SignInCallbackPage: React.FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const { refetchUser } = useUser()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorContext | undefined>(undefined)
  const [apiError, setApiError] = useState<string | null>(null)

  useEffect(() => {
    const authenticateUser = async () => {
      if (!auth.isAuthenticated || !auth.user?.profile) return

      try {
        const sub = auth.user.profile.sub
        const email = auth.user.profile.email

        if (!sub || !email) {
          setApiError('Missing user information from authentication provider')
          return
        }

        const result = await userApi.authenticateUser(sub, email)

        if (result.success) {
          await refetchUser()
          navigate('/')
        } else {
          setApiError(`Failed to authenticate: ${result.error.error.message}`)
        }
      } catch (err) {
        setApiError(err instanceof Error ? err.message : 'Failed to authenticate user')
      }
    }

    setIsLoading(auth.isLoading)
    setError(auth.error)

    if (auth.isAuthenticated && !auth.isLoading) {
      authenticateUser()
    }
  }, [auth.isAuthenticated, auth.isLoading, auth.error, auth.user])

  return (
    <MainLayout>
      <div className="flex items-center justify-center h-full">
        <div className="bg-primary-evergreen p-6 rounded-md shadow max-w-md w-full text-center">
          { isLoading && (
            <>
              <h1 className="text-2xl font-bold mb-4 text-white">Signing in...</h1>
              <p className="text-white">
                Verifying your credentials.
              </p>
            </>
          )}
          { error && (
            <>
              <h1 className="text-2xl font-bold mb-4 text-amber">An error occurred</h1>
              <p className="text-white mb-4">{error.message}</p>
              <Link to="/sign-in" className="text-primary-evergreen hover:underline">
                Back to sign in page
              </Link>
            </>
          )}
          { apiError && (
            <>
              <h1 className="text-2xl font-bold mb-4 text-amber">API Error</h1>
              <p className="text-white mb-4">{apiError}</p>
              <Link to="/sign-in" className="text-primary-evergreen hover:underline">
                Back to sign in page
              </Link>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default SignInCallbackPage