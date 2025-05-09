import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="py-3 px-4 border-b bg-card shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/top" className="font-bold text-2xl text-primary">tidly</Link>
        <nav>
          <ul className="flex gap-6 items-center">
            <li>
              <span className="cursor-default text-muted-foreground flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                user@example.com
              </span>
            </li>
            <li>
              <Link 
                to="/logout" 
                className="px-3 py-1.5 border border-border rounded hover:bg-accent/30 transition-colors"
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}