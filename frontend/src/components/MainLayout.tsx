import React from 'react'
import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface MainLayoutProps {
  children: ReactNode
  showLogout?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showLogout = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-primary-deepforest">
      <Header />
      <main className="container mx-auto flex-grow p-4">
        {children}
      </main>
      <Footer showLogout={showLogout} />
    </div>
  )
}

export default MainLayout