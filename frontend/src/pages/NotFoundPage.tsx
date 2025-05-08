import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page not found</p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
        Back to Home
      </Link>
    </div>
  )
}