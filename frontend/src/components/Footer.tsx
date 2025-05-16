import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

interface FooterProps {
  showSignOut?: boolean
}

const Footer: React.FC<FooterProps> = ({ showSignOut = false }) => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    navigate('/sign-in')
  }

  return (
    <footer className="bg-primary-deepforest p-4 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">&copy; ito ryo</div>
        {showSignOut && (
          <Button onClick={handleSignOut} variant="secondary">Sign out</Button>
        )}
      </div>
    </footer>
  )
}

export default Footer