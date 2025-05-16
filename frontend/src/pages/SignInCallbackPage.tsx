import React, { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import MainLayout from '../components/MainLayout'

const SignInCallbackPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])
  
  if (!isLoading && !error) {
    return <Navigate to="/" replace />
  }
  
  return (
    <MainLayout>
      <div className="flex items-center justify-center h-full">
        <div className="bg-primary-evergreen p-6 rounded-md shadow max-w-md w-full text-center">
          {isLoading ? (
            <>
              <h1 className="text-2xl font-bold mb-4 text-white">ログイン処理中...</h1>
              <p className="text-white">
                認証情報を検証しています。しばらくお待ちください。
              </p>
            </>
          ) : error ? (
            <>
              <h1 className="text-2xl font-bold mb-4 text-amber">エラーが発生しました</h1>
              <p className="text-white mb-4">{error}</p>
              <Link to="/sign-in" className="text-primary-evergreen hover:underline">
                ログインページに戻る
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </MainLayout>
  )
}

export default SignInCallbackPage