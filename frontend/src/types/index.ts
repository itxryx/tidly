export interface Post {
  content: string;
  timestamp: string;
}

export interface Board {
  content: string;
  lastUpdated: string | null;
}

export interface UserProfile {
  sub?: string;
  email?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  email_verified?: boolean;
  picture?: string;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: UserProfile | null;
  error: Error | null;
}