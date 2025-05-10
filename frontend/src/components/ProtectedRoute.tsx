import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '@/lib/AuthContext';

type ProtectedRouteProps = {
  redirectPath?: string;
  children?: React.ReactNode;
};

export const ProtectedRoute = ({
  redirectPath = '/login',
  children,
}: ProtectedRouteProps) => {
  const { authState } = useAuthContext();
  
  if (authState.isLoading) {
    // 認証情報のロード中は単純なローディング表示
    return (
      <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!authState.isAuthenticated) {
    // 認証されていない場合はリダイレクト
    return <Navigate to={redirectPath} replace />;
  }

  // 認証されている場合は子要素またはOutletを表示
  return children ? <>{children}</> : <Outlet />;
};

type PublicRouteProps = {
  redirectPath?: string;
  children?: React.ReactNode;
};

export const PublicRoute = ({
  redirectPath = '/top',
  children,
}: PublicRouteProps) => {
  const { authState } = useAuthContext();
  
  if (authState.isLoading) {
    // 認証情報のロード中は単純なローディング表示
    return (
      <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (authState.isAuthenticated) {
    // すでに認証されている場合はリダイレクト
    return <Navigate to={redirectPath} replace />;
  }

  // 認証されていない場合は子要素またはOutletを表示
  return children ? <>{children}</> : <Outlet />;
};