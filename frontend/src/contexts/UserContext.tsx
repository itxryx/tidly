import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { userApi } from '../api';
import type { User } from '../api';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  refetchUser: () => Promise<void>;
}

const defaultUserContext: UserContextType = {
  user: null,
  isLoading: false,
  error: null,
  refetchUser: async () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    if (!auth.user?.profile) {
      setUser(null);
      return;
    }

    const sub = auth.user.profile.sub;
    const email = auth.user.profile.email || '';

    if (!sub || !email) {
      setError('Incomplete credentials');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await userApi.authenticateUser(sub, email);

      if (result.success) {
        setUser(result.data);
      } else {
        console.error('User authentication failed:', result.error);
        setError(`Failed to get user information: ${result.error.error.message}`);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Error occurred while fetching user information');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [auth.isAuthenticated, auth.user]);

  const value: UserContextType = {
    user,
    isLoading,
    error,
    refetchUser: fetchUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};