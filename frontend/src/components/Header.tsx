import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">tidly</Link>
        <nav>
          <ul className="flex gap-4">
            <li><span className="cursor-default">user@example.com</span></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}