import { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import type { AuthState, UserProfile } from '../types/index';

export const useAuthState = (): AuthState => {
  const auth = useAuth();
  
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    user: null,
    error: null
  });
  
  useEffect(() => {
    if (auth.isLoading) {
      setAuthState({
        isLoading: true,
        isAuthenticated: false,
        user: null,
        error: null
      });
      return;
    }
    
    if (auth.error) {
      setAuthState({
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: auth.error
      });
      return;
    }
    
    if (auth.isAuthenticated && auth.user) {
      const userProfile: UserProfile = {
        sub: auth.user.profile.sub,
        email: auth.user.profile.email,
        name: auth.user.profile.name,
        given_name: auth.user.profile.given_name,
        family_name: auth.user.profile.family_name,
        email_verified: auth.user.profile.email_verified,
        picture: auth.user.profile.picture
      };
      
      setAuthState({
        isLoading: false,
        isAuthenticated: true,
        user: userProfile,
        error: null
      });
    } else {
      setAuthState({
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: null
      });
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.user, auth.error]);
  
  return authState;
};