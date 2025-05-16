import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import MainLayout from '../components/MainLayout'
import Button from '../components/Button'

const SignInPage: React.FC = () => {
  const navigate = useNavigate()
  const isAuthenticated = false

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleGoogleSignIn = () => {
    navigate('/sign-in/callback')
  }
  
  return (
    <MainLayout>
      <div className="flex items-center justify-center h-full">
        <div className="bg-primary-evergreen p-6 rounded-md shadow max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-white">tidlyへログイン</h1>
          
          <div className="space-y-4">
            <p className="text-center text-white mb-4">
              tidlyのサービスを利用するには、ログインが必要です。
            </p>
            
            <Button
              onClick={handleGoogleSignIn}
              fullWidth
              className="flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              Googleでログイン
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default SignInPage