import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">tidly</h1>
            <div className="h-1 w-16 mx-auto bg-accent/50 rounded-full mb-4"></div>
            <p className="text-muted-foreground">Simple and easy way to organize your thoughts</p>
          </div>
          
          <Link 
            to="/top" 
            className="flex justify-center w-full bg-secondary/20 border border-border p-3 rounded-lg hover:bg-secondary/40 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="w-4 h-4"></span>
              Sign in with Google
            </span>
          </Link>
        </div>
        
        <footer className="mt-8 text-center">
          <ul className="flex gap-6 justify-center">
            <li>
              <Link 
                to="/about" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/privacy-policy" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  )
}