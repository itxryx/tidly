import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}