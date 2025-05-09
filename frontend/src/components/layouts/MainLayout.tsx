import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <Header />
      <main className="flex-1 py-3 bg-background overflow-hidden">
        <div className="container mx-auto px-4 h-full">
          <Outlet />
        </div>
      </main>
      <Footer className="flex-none" />
    </div>
  )
}