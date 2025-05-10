import { Link } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const auth = useAuth()

  const handleLogin = async () => {
    auth.signinRedirect()
  }
  
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">tidly</h1>
          </div>
          
          <Button
          className="flex justify-center w-full"
            onClick={handleLogin}
          >
            Sign in with Google
          </Button>
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