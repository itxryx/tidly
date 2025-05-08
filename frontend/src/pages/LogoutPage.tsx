import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LogoutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }, [navigate])

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Logging Out...</h1>
      <p>Processing logout. Please wait a moment.</p>
    </div>
  )
}