import React from 'react'
import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface MainLayoutProps {
  children: ReactNode
  showSignOut?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showSignOut = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-primary-darkgreen">
      <Header />
      <main className="container mx-auto flex-grow p-4">
        {children}
      </main>
      <Footer showSignOut={showSignOut} />
    </div>
  )
}

export default MainLayout