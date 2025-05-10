import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider as OidcAuthProvider } from 'react-oidc-context'
import { AuthProvider } from './lib/AuthContext'
import App from './App.tsx'

const cognitoAuthConfig = {
  authority: `https://cognito-idp.${import.meta.env.VITE_COGNITO_REGION}.amazonaws.com/${import.meta.env.VITE_COGNITO_USER_POOL_ID}`,
  client_id: String(import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID),
  redirect_uri: String(import.meta.env.VITE_COGNITO_REDIRECT_CALLBACK_URL),
  post_logout_redirect_uri: String(import.meta.env.VITE_COGNITO_REDIRECT_SIGNOUT_URL),
  response_type: "code",
  scope: "email openid"
};


function AppWithForcedDarkTheme() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OidcAuthProvider {...cognitoAuthConfig}>
      <AuthProvider>
        <AppWithForcedDarkTheme />
      </AuthProvider>
    </OidcAuthProvider>
  </StrictMode>,
)
