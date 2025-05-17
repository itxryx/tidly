import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

const Header: React.FC = () => {
  const auth = useAuth()

  return (
    <header className="bg-primary-deepforest p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">tidly</Link>
        { auth.isAuthenticated && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-amber transform translate-y-[0.5px]"></div>
            </div>
            <div className="text-white">{ auth.user?.profile.email }</div>
        </div>
        ) }
      </div>
    </header>
  )
}

export default Header