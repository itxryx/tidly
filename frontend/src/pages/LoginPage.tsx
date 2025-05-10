import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/lib/AuthContext';

export default function LoginPage() {
  const { authState, login } = useAuthContext();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (authState.isAuthenticated) {
      window.location.href = '/top';
    }
  }, [authState.isAuthenticated]);

  const handleLogin = async () => {
    setIsProcessing(true);
    try {
      login();
    } catch (error) {
      setIsProcessing(false);
    }
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
            disabled={isProcessing || authState.isLoading}
          >
            {isProcessing || authState.isLoading ? (
              <span className="flex items-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Signing in...
              </span>
            ) : (
              'Sign in with Google'
            )}
          </Button>

          {authState.error && (
            <p className="mt-4 text-destructive text-sm text-center">
              Authentication failed. Please try again.
            </p>
          )}
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