import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h2 className="text-xl mb-2">Welcome to tidly</h2>
          <p className="text-gray-600">Simple and easy way to organize your thoughts</p>
        </div>
        <Link 
          to="/top" 
          className="w-full bg-white border border-gray-300 p-3 rounded-lg shadow-sm hover:shadow"
        >
          Sign in with Google
        </Link>
      </div>
      <footer className="mt-12">
        <ul className="flex gap-4">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
        </ul>
      </footer>
    </div>
  )
}