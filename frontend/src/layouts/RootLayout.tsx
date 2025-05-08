import { Outlet, Link } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">tidly</Link>
          <nav>
            <ul className="flex gap-4">
              <li><Link to="/dashboard">user@example.com</Link></li>
              <li><Link to="/logout">ログアウト</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="p-4 border-t">
        <div className="container mx-auto flex justify-between items-center">
          <div>© 2025 tidly</div>
          <ul className="flex gap-4">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/privacy">プライバシーポリシー</Link></li>
          </ul>
        </div>
      </footer>
    </div>
  )
}