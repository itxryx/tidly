import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="p-4 border-t">
      <div className="container mx-auto flex justify-between items-center">
        <div>© 2025 tidly</div>
        <ul className="flex gap-4">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
        </ul>
      </div>
    </footer>
  )
}