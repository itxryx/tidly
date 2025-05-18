import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from 'react-oidc-context'
import { UserProvider } from './contexts/UserContext'
import App from './App.tsx'
import './index.css'
import { AUTH_CONFIG } from './api/config'

const cognitoAuthConfig = {
  authority: AUTH_CONFIG.authority,
  client_id: AUTH_CONFIG.clientId,
  redirect_uri: AUTH_CONFIG.redirectUri,
  response_type: 'code',
  scope: 'email openid',
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
)
