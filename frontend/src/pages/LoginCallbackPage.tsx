import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/top')
    }, 1000)
  }, [navigate])

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Processing Login...</h1>
      <p>Checking login info. Please wait a moment.</p>
    </div>
  )
}