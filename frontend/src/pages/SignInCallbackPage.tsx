import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'
import type { ErrorContext } from 'react-oidc-context'
import MainLayout from '../components/MainLayout'

const SignInCallbackPage: React.FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorContext | undefined>(undefined)

  useEffect(() => {
    setIsLoading(auth.isLoading)
    setError(auth.error)

    if (auth.isAuthenticated) {
      navigate('/')
    }
  }, [auth.isLoading, auth.error])

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
        </div>
      </div>
    </MainLayout>
  )
}

export default SignInCallbackPage