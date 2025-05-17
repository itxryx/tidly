import React from 'react'
import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col bg-primary-darkgreen">
      <Header />
      <main className="container mx-auto flex-grow p-4">
        <div className="w-[90%] sm:w-[90%] md:w-1/2 mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout