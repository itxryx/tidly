import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../components/MainLayout'

const NotFoundPage: React.FC = () => {  
  return (
    <MainLayout>
      <div className="flex items-center justify-center h-full">
        <div className="bg-primary-evergreen p-6 rounded-md shadow max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-2 text-white">404</h1>
          <h2 className="text-2xl font-semibold mb-4 text-white">Not Found</h2>
          <Link to="/" className="text-primary-evergreen hover:underline">
            Back to top
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}

export default NotFoundPage