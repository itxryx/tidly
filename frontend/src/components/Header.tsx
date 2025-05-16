import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="bg-primary-deepforest p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">tidly</Link>
        <div className="text-white">user@example.com</div>
      </div>
    </header>
  )
}

export default Header