import { Link } from 'react-router-dom'

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`py-3 px-4 border-t bg-card shadow-inner ${className}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-muted-foreground">© 2025 tidly</div>
        <ul className="flex gap-6">
          <li>
            <Link 
              to="/about" 
              className="text-accent-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/privacy-policy" 
              className="text-accent-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}