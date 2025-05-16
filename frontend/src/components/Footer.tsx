import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

interface FooterProps {
  showLogout?: boolean
}

const Footer: React.FC<FooterProps> = ({ showLogout = false }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/sign-in')
  }

  return (
    <footer className="bg-primary-darkgreen p-4 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">© ito ryo</div>
        {showLogout && (
          <Button onClick={handleLogout} variant="secondary">ログアウト</Button>
        )}
      </div>
    </footer>
  )
}

export default Footer