import { createContext, useContext } from 'react';
import type { ReactNode, FC } from 'react';
import { useAuthState } from './useAuthState';
import type { AuthState } from '../types/index';
import { useAuth } from 'react-oidc-context';

const AuthContext = createContext<{
  authState: AuthState;
  login: () => void;
  logout: () => Promise<void>;
} | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const authState = useAuthState();
  const auth = useAuth();

  const login = () => {
    auth.signinRedirect();
  };

  const logout = async () => {
    if (auth.isAuthenticated) {
      await auth.removeUser();
      
      const clientId = String(import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID);
      const logoutUri = String(import.meta.env.VITE_COGNITO_REDIRECT_SIGNOUT_URL);
      const cognitoDomain = `https://${String(import.meta.env.VITE_COGNITO_DOMAIN)}`;
      window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};