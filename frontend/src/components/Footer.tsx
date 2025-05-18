import React from 'react'
import { useAuth } from 'react-oidc-context'

const Footer: React.FC = () => {
  const auth = useAuth()

  const handleSignOut = () => {
    auth.removeUser()
    const clientId = String(import.meta.env.VITE_COGNITO_CLIENT_ID);
    const logoutUri = String(import.meta.env.VITE_COGNITO_LOGOUT_URI);
    const cognitoDomain = String(import.meta.env.VITE_COGNITO_DOMAIN);
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  }

  return (
    <footer className="bg-primary-deepforest p-4 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">&copy; ito ryo</div>
        {auth.isAuthenticated && (
          <button
            onClick={handleSignOut}
            className="text-sm text-white hover:underline cursor-pointer"
          >
            Sign out
          </button>
        )}
      </div>
    </footer>
  )
}

export default Footer