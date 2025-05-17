import React from 'react'
import { useAuth } from 'react-oidc-context'
import MainLayout from '../components/MainLayout'
import Button from '../components/Button'

const SignInPage: React.FC = () => {
  const auth = useAuth()

  const handleGoogleSignIn = () => {
    auth.signinRedirect()
  }
  
  return (
    <MainLayout>
      <div className="flex items-center justify-center h-full">
        <div className="bg-primary-evergreen p-6 rounded-md shadow max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-white">tidly</h1>

          <div className="space-y-4">
            <Button
              onClick={handleGoogleSignIn}
              fullWidth
              className="flex items-center justify-center gap-2"
            >
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default SignInPage