import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from 'react-oidc-context'
import App from './App.tsx'
import './index.css'

const cognitoAuthConfig = {
  authority: String(import.meta.env.VITE_COGNITO_AUTHORITY),
  client_id: String(import.meta.env.VITE_COGNITO_CLIENT_ID),
  redirect_uri: String(import.meta.env.VITE_COGNITO_REDIRECT_URI),
  response_type: 'code',
  scope: 'email openid',
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
)
